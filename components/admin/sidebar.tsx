"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, CreditCard, BarChart3, Settings, LogOut, Shield, Home, Bell } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col h-screen">
      <div className="flex items-center gap-2 mb-8 p-2">
        <Shield className="h-6 w-6 text-blue-500" />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <Link href="/admin/dashboard">
          <Button variant={isActive("/admin/dashboard") ? "secondary" : "ghost"} className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>

        <Link href="/admin/users">
          <Button variant={isActive("/admin/users") ? "secondary" : "ghost"} className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
        </Link>

        <Link href="/admin/subscriptions">
          <Button variant={isActive("/admin/subscriptions") ? "secondary" : "ghost"} className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Subscriptions
          </Button>
        </Link>

        <Link href="/admin/payments">
          <Button variant={isActive("/admin/payments") ? "secondary" : "ghost"} className="w-full justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            Payments
          </Button>
        </Link>

        <Link href="/admin/notifications">
          <Button variant={isActive("/admin/notifications") ? "secondary" : "ghost"} className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </Link>

        <Link href="/admin/settings">
          <Button variant={isActive("/admin/settings") ? "secondary" : "ghost"} className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>

      <Button variant="ghost" className="justify-start mt-auto" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}

