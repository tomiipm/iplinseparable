"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, CreditCard, TrendingUp, AlertTriangle } from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    pendingPayments: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // This is mock data for demonstration
        setStats({
          totalUsers: 156,
          activeSubscriptions: 87,
          totalRevenue: 2345.67,
          pendingPayments: 3,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="flex items-center justify-between">
              <span>{isLoading ? "Loading..." : stats.totalUsers}</span>
              <Users className="h-5 w-5 text-blue-500" />
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Subscriptions</CardDescription>
            <CardTitle className="flex items-center justify-between">
              <span>{isLoading ? "Loading..." : stats.activeSubscriptions}</span>
              <CreditCard className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="flex items-center justify-between">
              <span>{isLoading ? "Loading..." : `$${stats.totalRevenue.toFixed(2)}`}</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Payments</CardDescription>
            <CardTitle className="flex items-center justify-between">
              <span>{isLoading ? "Loading..." : stats.pendingPayments}</span>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="recent-users">
        <TabsList>
          <TabsTrigger value="recent-users">Recent Users</TabsTrigger>
          <TabsTrigger value="recent-payments">Recent Payments</TabsTrigger>
          <TabsTrigger value="system-logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="recent-users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Users who recently registered on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 font-medium text-gray-400 pb-2">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Registered</div>
                      <div>Status</div>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-4 py-2 border-b border-gray-800">
                        <div>John Doe</div>
                        <div>john@example.com</div>
                        <div>2 hours ago</div>
                        <div className="text-green-500">Active</div>
                      </div>

                      <div className="grid grid-cols-4 py-2 border-b border-gray-800">
                        <div>Jane Smith</div>
                        <div>jane@example.com</div>
                        <div>5 hours ago</div>
                        <div className="text-green-500">Active</div>
                      </div>

                      <div className="grid grid-cols-4 py-2 border-b border-gray-800">
                        <div>Robert Johnson</div>
                        <div>robert@example.com</div>
                        <div>1 day ago</div>
                        <div className="text-gray-400">Free Trial</div>
                      </div>

                      <div className="grid grid-cols-4 py-2 border-b border-gray-800">
                        <div>Emily Davis</div>
                        <div>emily@example.com</div>
                        <div>2 days ago</div>
                        <div className="text-green-500">Active</div>
                      </div>

                      <div className="grid grid-cols-4 py-2 border-b border-gray-800">
                        <div>Michael Wilson</div>
                        <div>michael@example.com</div>
                        <div>3 days ago</div>
                        <div className="text-red-500">Expired</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent-payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Latest payments processed on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-5 font-medium text-gray-400 pb-2">
                      <div>User</div>
                      <div>Amount</div>
                      <div>Method</div>
                      <div>Date</div>
                      <div>Status</div>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-5 py-2 border-b border-gray-800">
                        <div>John Doe</div>
                        <div>$1.00</div>
                        <div>PayPal</div>
                        <div>Today</div>
                        <div className="text-green-500">Succeeded</div>
                      </div>

                      <div className="grid grid-cols-5 py-2 border-b border-gray-800">
                        <div>Jane Smith</div>
                        <div>$1.00</div>
                        <div>PayPal</div>
                        <div>Yesterday</div>
                        <div className="text-green-500">Succeeded</div>
                      </div>

                      <div className="grid grid-cols-5 py-2 border-b border-gray-800">
                        <div>Emily Davis</div>
                        <div>$1.00</div>
                        <div>PayPal</div>
                        <div>2 days ago</div>
                        <div className="text-green-500">Succeeded</div>
                      </div>

                      <div className="grid grid-cols-5 py-2 border-b border-gray-800">
                        <div>Robert Johnson</div>
                        <div>$1.00</div>
                        <div>PayPal</div>
                        <div>3 days ago</div>
                        <div className="text-yellow-500">Pending</div>
                      </div>

                      <div className="grid grid-cols-5 py-2 border-b border-gray-800">
                        <div>Michael Wilson</div>
                        <div>$1.00</div>
                        <div>PayPal</div>
                        <div>5 days ago</div>
                        <div className="text-red-500">Failed</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-logs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 font-medium text-gray-400 pb-2">
                      <div>Event</div>
                      <div>Time</div>
                      <div>Details</div>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-3 py-2 border-b border-gray-800">
                        <div className="text-blue-500">User Login</div>
                        <div>10 minutes ago</div>
                        <div>John Doe logged in</div>
                      </div>

                      <div className="grid grid-cols-3 py-2 border-b border-gray-800">
                        <div className="text-green-500">Payment Received</div>
                        <div>1 hour ago</div>
                        <div>Payment of $1.00 from Jane Smith</div>
                      </div>

                      <div className="grid grid-cols-3 py-2 border-b border-gray-800">
                        <div className="text-purple-500">New User</div>
                        <div>2 hours ago</div>
                        <div>Robert Johnson registered</div>
                      </div>

                      <div className="grid grid-cols-3 py-2 border-b border-gray-800">
                        <div className="text-yellow-500">Subscription Expired</div>
                        <div>5 hours ago</div>
                        <div>Michael Wilson's subscription expired</div>
                      </div>

                      <div className="grid grid-cols-3 py-2 border-b border-gray-800">
                        <div className="text-red-500">Payment Failed</div>
                        <div>1 day ago</div>
                        <div>Payment attempt by David Brown failed</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

