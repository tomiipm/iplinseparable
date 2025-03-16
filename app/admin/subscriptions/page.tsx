"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, RefreshCw, XCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Define the subscription type
interface Subscription {
  id: string
  userId: string
  userName: string
  userEmail: string
  status: "active" | "canceled" | "expired" | "past_due"
  provider: "paypal" | "manual"
  currentPeriodStart: string
  currentPeriodEnd: string
  createdAt: string
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // This is mock data for demonstration
        const mockSubscriptions: Subscription[] = [
          {
            id: "sub_1",
            userId: "1",
            userName: "John Doe",
            userEmail: "john@example.com",
            status: "active",
            provider: "paypal",
            currentPeriodStart: "2023-05-14T00:00:00Z",
            currentPeriodEnd: "2023-05-15T00:00:00Z",
            createdAt: "2023-01-15T10:30:00Z",
          },
          {
            id: "sub_2",
            userId: "2",
            userName: "Jane Smith",
            userEmail: "jane@example.com",
            status: "active",
            provider: "paypal",
            currentPeriodStart: "2023-05-14T00:00:00Z",
            currentPeriodEnd: "2023-05-15T00:00:00Z",
            createdAt: "2023-02-20T14:45:00Z",
          },
          {
            id: "sub_3",
            userId: "4",
            userName: "Emily Davis",
            userEmail: "emily@example.com",
            status: "active",
            provider: "manual",
            currentPeriodStart: "2023-05-10T00:00:00Z",
            currentPeriodEnd: "2023-06-10T00:00:00Z",
            createdAt: "2023-04-05T16:20:00Z",
          },
          {
            id: "sub_4",
            userId: "6",
            userName: "David Brown",
            userEmail: "david@example.com",
            status: "canceled",
            provider: "paypal",
            currentPeriodStart: "2023-05-01T00:00:00Z",
            currentPeriodEnd: "2023-05-02T00:00:00Z",
            createdAt: "2023-03-15T12:30:00Z",
          },
          {
            id: "sub_5",
            userId: "7",
            userName: "Sarah Johnson",
            userEmail: "sarah@example.com",
            status: "expired",
            provider: "paypal",
            currentPeriodStart: "2023-04-30T00:00:00Z",
            currentPeriodEnd: "2023-05-01T00:00:00Z",
            createdAt: "2023-02-10T09:15:00Z",
          },
        ]

        setSubscriptions(mockSubscriptions)
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.userEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRenewSubscription = (subscriptionId: string) => {
    // In a real implementation, you would call your API to renew the subscription

    setSubscriptions(
      subscriptions.map((subscription) =>
        subscription.id === subscriptionId
          ? {
              ...subscription,
              status: "active",
              currentPeriodStart: new Date().toISOString(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
            }
          : subscription,
      ),
    )

    toast({
      title: "Subscription Renewed",
      description: "The subscription has been renewed successfully.",
    })
  }

  const handleCancelSubscription = (subscriptionId: string) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      setSubscriptions(
        subscriptions.map((subscription) =>
          subscription.id === subscriptionId
            ? {
                ...subscription,
                status: "canceled",
              }
            : subscription,
        ),
      )

      toast({
        title: "Subscription Canceled",
        description: "The subscription has been canceled successfully.",
      })
    }
  }

  const handleExtendSubscription = (subscriptionId: string, days: number) => {
    setSubscriptions(
      subscriptions.map((subscription) => {
        if (subscription.id === subscriptionId) {
          const currentEnd = new Date(subscription.currentPeriodEnd)
          const newEnd = new Date(currentEnd.getTime() + days * 24 * 60 * 60 * 1000)

          return {
            ...subscription,
            currentPeriodEnd: newEnd.toISOString(),
            status: "active",
          }
        }
        return subscription
      }),
    )

    toast({
      title: "Subscription Extended",
      description: `The subscription has been extended by ${days} days.`,
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Subscriptions</h1>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage user subscriptions</CardDescription>
            </div>

            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search subscriptions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading subscriptions...</div>
          ) : filteredSubscriptions.length === 0 ? (
            <div className="text-center py-4">No subscriptions found</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-7 font-medium text-gray-400 pb-2">
                <div>User</div>
                <div>Status</div>
                <div>Provider</div>
                <div>Start Date</div>
                <div>End Date</div>
                <div>Created</div>
                <div>Actions</div>
              </div>

              <div className="space-y-2">
                {filteredSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="grid grid-cols-7 py-2 border-b border-gray-800">
                    <div>
                      <div>{subscription.userName}</div>
                      <div className="text-sm text-gray-400">{subscription.userEmail}</div>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className={
                          subscription.status === "active"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : subscription.status === "canceled"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {subscription.status === "active"
                          ? "Active"
                          : subscription.status === "canceled"
                            ? "Canceled"
                            : subscription.status === "expired"
                              ? "Expired"
                              : "Past Due"}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="outline">{subscription.provider === "paypal" ? "PayPal" : "Manual"}</Badge>
                    </div>
                    <div>{new Date(subscription.currentPeriodStart).toLocaleDateString()}</div>
                    <div>{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</div>
                    <div>{new Date(subscription.createdAt).toLocaleDateString()}</div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRenewSubscription(subscription.id)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Renew Subscription
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleExtendSubscription(subscription.id, 7)}>
                            <Clock className="h-4 w-4 mr-2" />
                            Extend by 7 Days
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleExtendSubscription(subscription.id, 30)}>
                            <Clock className="h-4 w-4 mr-2" />
                            Extend by 30 Days
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-500 focus:text-red-500"
                            onClick={() => handleCancelSubscription(subscription.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

