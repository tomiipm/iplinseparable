"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpCircle, ArrowDownCircle, Target, TrendingUp, TrendingDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Signal = {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  entryPrice: number
  tp1: number
  tp2: number
  sl: number
  confidence: number
  timestamp: Date
}

export function SignalDemo() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Generate mock signals
  useEffect(() => {
    const mockSignals: Signal[] = [
      {
        id: "1",
        symbol: "EURUSD",
        type: "BUY",
        entryPrice: 1.095,
        tp1: 1.1,
        tp2: 1.105,
        sl: 1.09,
        confidence: 87,
        timestamp: new Date(),
      },
      {
        id: "2",
        symbol: "GBPUSD",
        type: "SELL",
        entryPrice: 1.265,
        tp1: 1.26,
        tp2: 1.255,
        sl: 1.27,
        confidence: 92,
        timestamp: new Date(),
      },
      {
        id: "3",
        symbol: "XAUUSD",
        type: "BUY",
        entryPrice: 1950.5,
        tp1: 1960.0,
        tp2: 1970.0,
        sl: 1940.0,
        confidence: 78,
        timestamp: new Date(),
      },
      {
        id: "4",
        symbol: "USDJPY",
        type: "SELL",
        entryPrice: 149.5,
        tp1: 149.0,
        tp2: 148.5,
        sl: 150.0,
        confidence: 85,
        timestamp: new Date(),
      },
      {
        id: "5",
        symbol: "US30",
        type: "BUY",
        entryPrice: 33500,
        tp1: 33600,
        tp2: 33700,
        sl: 33400,
        confidence: 81,
        timestamp: new Date(),
      },
    ]

    setSignals(mockSignals)

    // Rotate through signals
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockSignals.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (signals.length === 0) return null

  const currentSignal = signals[currentIndex]

  return (
    <Card className="bg-gray-800/50 backdrop-blur border-gray-700 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">Live Signal Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSignal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentSignal.type === "BUY" ? "bg-green-500/20" : "bg-red-500/20"
                  }`}
                >
                  {currentSignal.type === "BUY" ? (
                    <ArrowUpCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{currentSignal.symbol}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={currentSignal.type === "BUY" ? "success" : "destructive"}>
                      {currentSignal.type}
                    </Badge>
                    <span className="text-sm text-gray-400">{currentSignal.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-400">Confidence</div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-xl font-bold">{currentSignal.confidence}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Entry Price</div>
                <div className="text-xl font-bold">{currentSignal.entryPrice.toFixed(4)}</div>
                <div className="mt-2 flex items-center gap-1">
                  {currentSignal.type === "BUY" ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">Long Position</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-500">Short Position</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-700/30 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Take Profit</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    TP1
                  </Badge>
                  <span className="text-xl font-bold">{currentSignal.tp1.toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    TP2
                  </Badge>
                  <span className="text-xl font-bold">{currentSignal.tp2.toFixed(4)}</span>
                </div>
              </div>

              <div className="bg-gray-700/30 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Stop Loss</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                    SL
                  </Badge>
                  <span className="text-xl font-bold">{currentSignal.sl.toFixed(4)}</span>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Risk:{" "}
                  {Math.abs(((currentSignal.entryPrice - currentSignal.sl) / currentSignal.entryPrice) * 100).toFixed(
                    2,
                  )}
                  %
                </div>
              </div>
            </div>

            <div className="relative h-[100px] bg-gray-900/50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[2px] bg-gray-700"></div>
              </div>

              {/* Entry marker */}
              <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: "30%" }}>
                <div className="h-[80px] w-[2px] bg-blue-500/50"></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 -ml-[6px] w-[14px] h-[14px] rounded-full bg-blue-500"></div>
                <div className="absolute top-[5px] -ml-[10px] text-xs text-blue-400">Entry</div>
              </div>

              {/* TP1 marker */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: currentSignal.type === "BUY" ? "60%" : "15%",
                  top: currentSignal.type === "BUY" ? "30%" : "70%",
                }}
              >
                <div className="h-[60px] w-[2px] bg-green-500/50"></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 -ml-[6px] w-[14px] h-[14px] rounded-full bg-green-500"></div>
                <div className="absolute top-[5px] -ml-[10px] text-xs text-green-400">TP1</div>
              </div>

              {/* TP2 marker */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: currentSignal.type === "BUY" ? "80%" : "5%",
                  top: currentSignal.type === "BUY" ? "20%" : "80%",
                }}
              >
                <div className="h-[40px] w-[2px] bg-green-500/50"></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 -ml-[6px] w-[14px] h-[14px] rounded-full bg-green-500"></div>
                <div className="absolute top-[5px] -ml-[10px] text-xs text-green-400">TP2</div>
              </div>

              {/* SL marker */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: currentSignal.type === "BUY" ? "20%" : "70%",
                  top: currentSignal.type === "BUY" ? "70%" : "30%",
                }}
              >
                <div className="h-[60px] w-[2px] bg-red-500/50"></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 -ml-[6px] w-[14px] h-[14px] rounded-full bg-red-500"></div>
                <div className="absolute top-[5px] -ml-[10px] text-xs text-red-400">SL</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-4">
          {signals.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? "bg-blue-500" : "bg-gray-600"}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

