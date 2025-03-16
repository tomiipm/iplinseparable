import { NextResponse } from "next/server"
import { verifyPaymentToken } from "@/lib/payment-service"

// PayPal API base URLs
const PAYPAL_API_BASE =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }

    const { valid, decodedToken } = await verifyPaymentToken(token)

    if (!valid || !decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    const { userId, amount, currency, metadata } = decodedToken

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

    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            description: "InseparableFX Daily Subscription",
            custom_id: userId,
          },
        ],
        application_context: {
          brand_name: "InseparableFX",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/complete?provider=paypal`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        },
      }),
    })

    if (!orderResponse.ok) {
      console.error("PayPal order creation error:", await orderResponse.text())
      return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 })
    }

    const orderData = await orderResponse.json()

    // Find the approval URL
    const approvalUrl = orderData.links.find((link: any) => link.rel === "approve").href

    // In a real implementation, you would store the order in your database and
    // associate it with the payment session

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      redirectUrl: approvalUrl,
    })
  } catch (error) {
    console.error("PayPal order creation error:", error)
    return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 })
  }
}

