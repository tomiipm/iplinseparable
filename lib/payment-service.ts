import { SignJWT, jwtVerify } from "jose"
import { nanoid } from "nanoid"

export type PaymentProvider = "paypal" | "card"

export interface CreatePaymentSessionParams {
  userId: string
  amount: number
  currency: string
  provider: PaymentProvider
  description: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}

export interface PaymentSession {
  id: string
  url: string
  provider: PaymentProvider
  expiresAt: Date
}

// This would be stored in environment variables in a real implementation
const SECRET_KEY = new TextEncoder().encode(
  process.env.PAYMENT_WEBHOOK_SECRET || "your-secret-key-min-32-chars-long-here-please",
)

export async function createPaymentSession(params: CreatePaymentSessionParams): Promise<PaymentSession> {
  const { userId, amount, currency, provider, description, successUrl, cancelUrl, metadata = {} } = params

  // Create a payment session ID
  const sessionId = nanoid()
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

  // In a real implementation, you would store the session in your database
  // await db.insert('payment_sessions', {
  //   id: sessionId,
  //   userId,
  //   amount,
  //   currency,
  //   provider,
  //   description,
  //   successUrl,
  //   cancelUrl,
  //   metadata: JSON.stringify(metadata),
  //   status: 'created',
  //   createdAt: new Date(),
  //   expiresAt
  // })

  // Create a signed token for the payment session
  const token = await new SignJWT({
    sessionId,
    userId,
    amount,
    currency,
    provider,
    metadata,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .setJti(nanoid())
    .sign(SECRET_KEY)

  // Generate the appropriate payment URL based on the provider
  let url: string

  switch (provider) {
    case "paypal":
      url = `/api/payments/paypal/create-order?token=${token}`
      break
    case "card":
      url = `/api/payments/card/process?token=${token}`
      break
    default:
      throw new Error(`Unsupported payment provider: ${provider}`)
  }

  return {
    id: sessionId,
    url,
    provider,
    expiresAt,
  }
}

export async function verifyPaymentToken(token: string) {
  try {
    // Verify the token
    const { payload } = await jwtVerify(token, SECRET_KEY)

    // In a real implementation, you would also check if the session exists
    // and is still valid in your database

    return {
      valid: true,
      decodedToken: payload,
    }
  } catch (error) {
    console.error("Error verifying payment token:", error)
    return {
      valid: false,
      decodedToken: null,
    }
  }
}

export async function activateSubscription(userId: string, provider: PaymentProvider, externalId: string) {
  // In a real implementation, you would:
  // 1. Verify the payment was successful
  // 2. Create or update the user's subscription in your database
  // 3. Set the next billing date

  // This is a simplified example
  console.log(`Activating subscription for user ${userId} with ${provider} payment ${externalId}`)

  // await db.insert('subscriptions', {
  //   userId,
  //   provider,
  //   externalId,
  //   status: 'active',
  //   currentPeriodStart: new Date(),
  //   currentPeriodEnd: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // })

  return { success: true }
}

