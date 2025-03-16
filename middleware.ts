import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Secret key for verifying JWT tokens
const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || process.env.PAYMENT_WEBHOOK_SECRET || "admin-secret-key-min-32-chars-long",
)

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin panel
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip authentication for the login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Get the admin session cookie
    const adminSession = request.cookies.get("admin_session")?.value

    if (!adminSession) {
      // Redirect to login if no session cookie
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      // Verify the JWT token
      const { payload } = await jwtVerify(adminSession, SECRET_KEY)

      // Check if the user has admin role
      if (payload.role !== "admin" && payload.role !== "superadmin") {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      // Continue to the admin panel
      return NextResponse.next()
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Continue for non-admin routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

