"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpCircle, ArrowDownCircle, Target, AlertTriangle } from "lucide-react"
import { useRealTimeSignals } from "@/hooks/use-real-time-signals"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import type { Signal } from "@/types/signal"
import Link from "next/link"

export function SignalPanel() {
  const { latestSignal, isConnected } = useRealTimeSignals()
  const [previousSignals, setPreviousSignals] = useState<Signal[]>([])
  const { toast } = useToast()

  // Show notification when a new signal arrives
  useEffect(() => {
    if (latestSignal) {
      // Check if this is a new signal (not in previousSignals)
      const isNewSignal = !previousSignals.some(
        (s) => s.symbol === latestSignal.symbol && s.timestamp === latestSignal.timestamp,
      )

      if (isNewSignal && previousSignals.length > 0) {
        // Show toast notification
        toast({
          title: `New Signal: ${latestSignal.type} ${latestSignal.symbol}`,
          description: `Entry: ${latestSignal.entryPrice} | TP1: ${latestSignal.tp1} | SL: ${latestSignal.sl}`,
          variant: latestSignal.type === "BUY" ? "default" : "destructive",
        })
      }

      // Update previous signals
      setPreviousSignals((prev) => {
        const updated = [latestSignal, ...prev]
        // Keep only the last 5 signals
        return updated.slice(0, 5)
      })
    }
  }, [latestSignal, toast])

  if (!latestSignal) {
    return (
      <Card className="p-4 bg-gray-800/50 backdrop-blur border-gray-700">
        <div className="flex items-center justify-center h-24">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-700 h-10 w-10"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-700 rounded w-36"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              {isConnected ? "Waiting for signals..." : "Connecting to signal server..."}
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={latestSignal.timestamp}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 bg-gray-800/50 backdrop-blur border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {latestSignal.type === "BUY" ? (
                  <ArrowUpCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <ArrowDownCircle className="w-8 h-8 text-red-500" />
                )}
                <div>
                  <h3 className="text-xl font-bold">{latestSignal.symbol}</h3>
                  <p className="text-gray-400">Entry: {latestSignal.entryPrice}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-1">
                    TP1
                  </Badge>
                  <p className="text-green-400">{latestSignal.tp1}</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-1">
                    TP2
                  </Badge>
                  <p className="text-green-400">{latestSignal.tp2}</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-1">
                    SL
                  </Badge>
                  <p className="text-red-400">{latestSignal.sl}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-bold">{latestSignal.confidence}%</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400 flex items-center justify-end">
              <Link href="/risk-disclosure" className="flex items-center gap-1 hover:text-gray-300">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span>Not financial advice. See risk disclosure.</span>
              </Link>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

