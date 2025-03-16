import { NextResponse } from "next/server"
import { activateSubscription } from "@/lib/payment-service"

// PayPal API base URLs
const PAYPAL_API_BASE =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, userId } = body

    if (!orderId || !userId) {
      return NextResponse.json({ error: "Missing orderId or userId" }, { status: 400 })
    }

    // Get PayPal access token
    const authResponse = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    })

    if (!authResponse.ok) {
      console.error("PayPal auth error:", await authResponse.text())
      return NextResponse.json({ error: "Failed to authenticate with PayPal" }, { status: 500 })
    }

    const authData = await authResponse.json()
    const accessToken = authData.access_token

    // Capture the order
    const captureResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!captureResponse.ok) {
      console.error("PayPal capture error:", await captureResponse.text())
      return NextResponse.json({ error: "Failed to capture PayPal order" }, { status: 500 })
    }

    const captureData = await captureResponse.json()

    // Verify the payment was successful
    if (captureData.status !== "COMPLETED") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    // Activate the subscription
    await activateSubscription(userId, "paypal", orderId)

    return NextResponse.json({
      success: true,
      message: "Payment successful and subscription activated",
    })
  } catch (error) {
    console.error("PayPal capture error:", error)
    return NextResponse.json({ error: "Failed to capture PayPal payment" }, { status: 500 })
  }
}

