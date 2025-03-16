"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface Subscription {
  status: "active" | "canceled" | "past_due"
  currentPeriodEnd: string
  provider: string
  cancelUrl: string
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCanceling, setIsCanceling] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch("/api/subscription/manage")

        if (!response.ok) {
          throw new Error("Failed to fetch subscription")
        }

        const data = await response.json()
        setSubscription(data)
      } catch (error) {
        console.error("Error fetching subscription:", error)
        toast({
          title: "Error",
          description: "Failed to load subscription details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [toast])

  const handleCancelSubscription = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.",
      )
    ) {
      return
    }

    setIsCanceling(true)

    try {
      const response = await fetch("/api/subscription/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "cancel" }),
      })

      if (!response.ok) {
        throw new Error("Failed to cancel subscription")
      }

      const data = await response.json()

      toast({
        title: "Subscription Canceled",
        description: "Your subscription has been canceled and will end at the current billing period",
        variant: "default",
      })

      // Update the subscription status
      setSubscription((prev) => (prev ? { ...prev, status: "canceled" } : null))
    } catch (error) {
      console.error("Error canceling subscription:", error)
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      })
    } finally {
      setIsCanceling(false)
    }
  }

  const handleReactivateSubscription = async () => {
    try {
      const response = await fetch("/api/subscription/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reactivate" }),
      })

      if (!response.ok) {
        throw new Error("Failed to reactivate subscription")
      }

      const data = await response.json()

      toast({
        title: "Subscription Reactivated",
        description: "Your subscription has been reactivated",
        variant: "default",
      })

      // Update the subscription status
      setSubscription((prev) => (prev ? { ...prev, status: "active" } : null))
    } catch (error) {
      console.error("Error reactivating subscription:", error)
      toast({
        title: "Error",
        description: "Failed to reactivate subscription",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Subscription</h1>
        <Card>
          <CardContent className="p-8 flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Subscription</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>You don't have an active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Subscribe to get access to real-time forex signals with precise entry points, take profits, and stop
              losses.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Subscription</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Subscription Status</CardTitle>
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
                    : "Past Due"}
              </Badge>
            </div>
            <CardDescription>
              {subscription.status === "active"
                ? "Your subscription is active"
                : subscription.status === "canceled"
                  ? "Your subscription will end soon"
                  : "Your payment is past due"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {subscription.status === "active" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : subscription.status === "canceled" ? (
                  <Clock className="h-5 w-5 text-yellow-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium">
                    {subscription.status === "active"
                      ? "Full Access"
                      : subscription.status === "canceled"
                        ? "Access Until Period End"
                        : "Limited Access"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {subscription.status === "active"
                      ? "You have access to all signals and features"
                      : subscription.status === "canceled"
                        ? "You will have access until your subscription ends"
                        : "Please update your payment method"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">
                    {subscription.status === "active"
                      ? "Renews on"
                      : subscription.status === "canceled"
                        ? "Ends on"
                        : "Payment due on"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(subscription.currentPeriodEnd), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-gray-500">
                    {subscription.provider === "paypal"
                      ? "PayPal"
                      : subscription.provider === "stripe"
                        ? "Credit/Debit Card"
                        : subscription.provider === "binance"
                          ? "Binance Pay"
                          : "Card"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {subscription.status === "active" ? (
              <Button
                variant="outline"
                className="w-full text-red-500 hover:text-red-600"
                onClick={handleCancelSubscription}
                disabled={isCanceling}
              >
                {isCanceling ? "Canceling..." : "Cancel Subscription"}
              </Button>
            ) : subscription.status === "canceled" ? (
              <Button className="w-full" onClick={handleReactivateSubscription}>
                Reactivate Subscription
              </Button>
            ) : (
              <Button className="w-full" asChild>
                <a href="/payment/update">Update Payment Method</a>
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>Your current plan and billing information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Plan</h3>
                <p className="font-medium">Daily Subscription</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400">Price</h3>
                <p className="font-medium">$1.00 / day</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400">Billing Cycle</h3>
                <p className="font-medium">Daily</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400">Next Billing Date</h3>
                <p className="font-medium">{format(new Date(subscription.currentPeriodEnd), "MMMM d, yyyy")}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="/payment/history">View Payment History</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

