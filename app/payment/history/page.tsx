"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface Payment {
  id: string
  amount: number
  currency: string
  status: "succeeded" | "failed" | "pending"
  provider: string
  createdAt: string
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // In a real implementation, you would fetch this from your API
        // This is mock data for demonstration
        const mockPayments: Payment[] = [
          {
            id: "pay_1234567890",
            amount: 1.0,
            currency: "USD",
            status: "succeeded",
            provider: "paypal",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          },
          {
            id: "pay_0987654321",
            amount: 1.0,
            currency: "USD",
            status: "succeeded",
            provider: "paypal",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          },
          {
            id: "pay_1122334455",
            amount: 1.0,
            currency: "USD",
            status: "succeeded",
            provider: "paypal",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          },
        ]

        setPayments(mockPayments)
      } catch (error) {
        console.error("Error fetching payments:", error)
        toast({
          title: "Error",
          description: "Failed to load payment history",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPayments()
  }, [toast])

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Payment History</h1>
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <Button variant="outline" asChild>
          <a href="/subscription">Back to Subscription</a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Your payment history for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No payment history found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-4 border border-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{format(new Date(payment.createdAt), "MMMM d, yyyy")}</p>
                    <p className="text-sm text-gray-400">{payment.provider === "paypal" ? "PayPal" : "Card"}</p>
                    <p className="text-xs text-gray-500">{payment.id}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      {payment.currency === "USD" ? "$" : ""}
                      {payment.amount.toFixed(2)} {payment.currency}
                    </p>
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "succeeded"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : payment.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                      }
                    >
                      {payment.status === "succeeded"
                        ? "Succeeded"
                        : payment.status === "pending"
                          ? "Pending"
                          : "Failed"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

