"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>Your payment process was cancelled.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500">You can try again or continue using the free features.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={() => router.push("/dashboard")} className="w-full">
            Return to Dashboard
          </Button>
          <Button variant="outline" onClick={() => router.push("/")} className="w-full">
            Go to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

