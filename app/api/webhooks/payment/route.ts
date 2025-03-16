import { NextResponse } from "next/server"
import { activateSubscription } from "@/lib/payment-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { provider, event, data } = body

    // Verify the webhook signature
    // In a real implementation, you would verify the signature using the provider's SDK

    // Handle different event types
    switch (event) {
      case "payment.succeeded":
        // Activate the subscription
        await activateSubscription(data.userId, provider, data.paymentId)
        break
      case "payment.failed":
        // Handle failed payment
        // You might want to notify the user or retry the payment
        break
      case "subscription.canceled":
        // Handle subscription cancellation
        // Update the subscription status in your database
        break
      default:
        console.log(`Unhandled payment event: ${event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

