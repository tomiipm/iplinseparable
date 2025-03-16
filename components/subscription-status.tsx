"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createPaymentSession, type PaymentProvider } from "@/lib/payment-service"

export function SubscriptionStatus() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentProvider>("card")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async () => {
    setIsLoading(true)

    try {
      // Create a payment session
      const session = await createPaymentSession({
        userId: "user-123", // This would come from your auth system
        amount: 1.0,
        currency: "USD",
        provider: paymentMethod,
        description: "InseparableFX Daily Subscription",
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
        metadata: {
          subscriptionType: "daily",
        },
      })

      // Redirect to the payment URL
      window.location.href = session.url
    } catch (error) {
      console.error("Subscription error:", error)
      toast({
        title: "Payment Error",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Subscription</CardTitle>
          {isSubscribed ? (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              Free Trial
            </Badge>
          )}
        </div>
        <CardDescription>
          {isSubscribed ? "Your subscription is active" : "Upgrade to access all signals"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {isSubscribed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-500" />
            )}
            <div>
              <p className="font-medium">{isSubscribed ? "Full Access" : "Limited Access"}</p>
              <p className="text-sm text-gray-500">
                {isSubscribed ? "You have access to all signals and features" : "Free trial with limited features"}
              </p>
            </div>
          </div>

          {isSubscribed && (
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Renews in 24 hours</p>
                <p className="text-sm text-gray-500">Your subscription will automatically renew</p>
              </div>
            </div>
          )}

          {!isSubscribed && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Historical Data Only</p>
                <p className="text-sm text-gray-500">Free users can only view past signals</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isSubscribed ? (
          <Button variant="outline" className="w-full">
            Manage Subscription
          </Button>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Subscribe for $1/day</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose Payment Method</DialogTitle>
                <DialogDescription>
                  Select your preferred payment method for your $1/day subscription.
                </DialogDescription>
              </DialogHeader>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as PaymentProvider)}
                className="gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="text-purple-500" />
                    Credit/Debit Card
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M7 11l5-7" />
                      <path d="M21 11V6a2 2 0 0 0-2-2h-4l-5 7" />
                      <path d="M3 7v5a2 2 0 0 0 2 2h10" />
                      <path d="M16 16a2 2 0 0 0-2 2" />
                      <path d="M13 18h4" />
                      <path d="M19 18a2 2 0 0 0 2-2v-5" />
                    </svg>
                    PayPal
                  </Label>
                </div>
              </RadioGroup>

              <DialogFooter>
                <Button
                  onClick={() => {
                    handleSubscribe()
                    setIsDialogOpen(false)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Continue to Payment"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  )
}

