import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { activateSubscription } from "@/lib/payment-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const provider = searchParams.get("provider") as "paypal" | "stripe" | "binance" | "card"
    const orderId = searchParams.get("orderId") || searchParams.get("sessionId") || searchParams.get("paymentId")
    const userId = searchParams.get("userId")

    if (!provider || !orderId) {
      return NextResponse.json({ error: "Missing provider or order ID" }, { status: 400 })
    }

    // Get the user ID from the query params or session cookie
    let userIdentifier = userId

    if (!userIdentifier) {
      const cookieStore = cookies()
      const sessionCookie = cookieStore.get("session")

      if (!sessionCookie?.value) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
      }

      // In a real implementation, you would decode and verify the session cookie
      // to get the user ID
      userIdentifier = "user-123" // Placeholder
    }

    // Activate the subscription
    await activateSubscription(userIdentifier, provider, orderId)

    // Redirect to the success page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/success`)
  } catch (error) {
    console.error("Payment completion error:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`)
  }
}

