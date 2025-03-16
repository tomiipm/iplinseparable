import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcryptjs from "bcryptjs"
import { sql } from "@vercel/postgres"
import { SignJWT } from "jose"
import { nanoid } from "nanoid"

// Secret key for signing JWT tokens
const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || process.env.PAYMENT_WEBHOOK_SECRET || "admin-secret-key-min-32-chars-long",
)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // In a real implementation, you would query your database
    // This is a simplified example with hardcoded admin credentials
    // In production, store hashed passwords in the database

    // Check if this is the default admin
    const isDefaultAdmin = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD

    if (!isDefaultAdmin) {
      // Query the database for the admin
      const result = await sql`
        SELECT * FROM admins WHERE email = ${email}
      `

      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      const admin = result.rows[0]

      // Verify password
      const passwordMatch = await bcryptjs.compare(password, admin.password)

      if (!passwordMatch) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
    }

    // Create admin session
    const sessionId = nanoid()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // In a real implementation, you would store the session in your database
    // await sql`
    //   INSERT INTO admin_sessions (id, admin_id, expires_at)
    //   VALUES (${sessionId}, ${admin.id}, ${expiresAt})
    // `

    // Create JWT token
    const token = await new SignJWT({
      sessionId,
      email,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .setJti(nanoid())
      .sign(SECRET_KEY)

    // Set cookie
    cookies().set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    })

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

