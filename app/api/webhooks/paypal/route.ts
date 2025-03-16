import { NextResponse } from "next/server"
import { activateSubscription } from "@/lib/payment-service"

// PayPal API base URLs
const PAYPAL_API_BASE =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

export async function POST(request: Request) {
  try {
    // Get the PayPal webhook ID from the request headers
    const paypalWebhookId = request.headers.get("paypal-transmission-id")
    const paypalAuth = request.headers.get("paypal-auth-algo")
    const paypalCert = request.headers.get("paypal-cert-url")
    const paypalSignature = request.headers.get("paypal-transmission-sig")
    const paypalTimestamp = request.headers.get("paypal-transmission-time")

    if (!paypalWebhookId || !paypalAuth || !paypalCert || !paypalSignature || !paypalTimestamp) {
      return NextResponse.json({ error: "Missing PayPal webhook headers" }, { status: 400 })
    }

    // Get the request body
    const body = await request.text()

    // In a real implementation, you would verify the webhook signature
    // using the PayPal SDK or API

    // For this example, we'll assume the webhook is valid
    const webhookEvent = JSON.parse(body)

    // Handle different event types
    switch (webhookEvent.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED":
        // Extract the custom ID (userId) from the webhook event
        const customId = webhookEvent.resource.purchase_units[0].custom_id
        const paymentId = webhookEvent.resource.id

        // Activate the subscription
        await activateSubscription(customId, "paypal", paymentId)
        break

      case "PAYMENT.CAPTURE.DENIED":
      case "PAYMENT.CAPTURE.REFUNDED":
        // Handle payment failure or refund
        // You might want to cancel the subscription or notify the user
        break

      default:
        console.log(`Unhandled PayPal webhook event: ${webhookEvent.event_type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("PayPal webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

