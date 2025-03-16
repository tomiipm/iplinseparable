"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

type TrendItem = {
  symbol: string
  trend: "up" | "down" | "neutral"
  strength: number
  lastUpdated: number
}

export function RealTimeTrendPanel() {
  const [trends, setTrends] = useState<TrendItem[]>([
    { symbol: "EURUSD", trend: "up", strength: 75, lastUpdated: Date.now() },
    { symbol: "GBPUSD", trend: "down", strength: 60, lastUpdated: Date.now() },
    { symbol: "USDJPY", trend: "up", strength: 85, lastUpdated: Date.now() },
    { symbol: "XAUUSD", trend: "neutral", strength: 40, lastUpdated: Date.now() },
    { symbol: "US30", trend: "down", strength: 65, lastUpdated: Date.now() },
  ])

  const [updatedSymbol, setUpdatedSymbol] = useState<string | null>(null)

  useEffect(() => {
    // Simulate trend updates
    const interval = setInterval(() => {
      setTrends((prevTrends) => {
        // Randomly select 1-2 symbols to update
        const numSymbolsToUpdate = Math.floor(Math.random() * 2) + 1
        const symbolsToUpdate = [...prevTrends]
          .sort(() => 0.5 - Math.random())
          .slice(0, numSymbolsToUpdate)
          .map((trend) => trend.symbol)

        // Update the selected symbols
        const updatedTrends = prevTrends.map((trend) => {
          if (symbolsToUpdate.includes(trend.symbol)) {
            // Randomly change trend direction with 30% probability
            const newTrend =
              Math.random() < 0.3
                ? (["up", "down", "neutral"] as const).filter((t) => t !== trend.trend)[Math.floor(Math.random() * 2)]
                : trend.trend

            // Adjust strength based on trend
            let newStrength = trend.strength
            if (newTrend === "up") {
              newStrength = Math.min(100, newStrength + Math.floor(Math.random() * 10))
            } else if (newTrend === "down") {
              newStrength = Math.min(100, newStrength + Math.floor(Math.random() * 10))
            } else {
              // For neutral, move strength toward middle (50)
              newStrength =
                newStrength > 50
                  ? Math.max(40, newStrength - Math.floor(Math.random() * 10))
                  : Math.min(60, newStrength + Math.floor(Math.random() * 10))
            }

            return {
              ...trend,
              trend: newTrend,
              strength: newStrength,
              lastUpdated: Date.now(),
            }
          }
          return trend
        })

        // Set the most recently updated symbol for animation
        if (symbolsToUpdate.length > 0) {
          setUpdatedSymbol(symbolsToUpdate[0])
          // Reset the updated symbol after animation
          setTimeout(() => setUpdatedSymbol(null), 1000)
        }

        return updatedTrends
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: TrendItem["trend"]) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      case "neutral":
        return <ArrowRight className="h-4 w-4 text-yellow-500" />
    }
  }

  const getTrendColor = (trend: TrendItem["trend"]) => {
    switch (trend) {
      case "up":
        return "bg-green-500"
      case "down":
        return "bg-red-500"
      case "neutral":
        return "bg-yellow-500"
    }
  }

  return (
    <Card className="h-full bg-gray-800/50 backdrop-blur border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">Real-Time Trend Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((item) => (
            <motion.div
              key={item.symbol}
              className={`p-3 rounded-lg ${
                updatedSymbol === item.symbol ? "bg-gray-700/50" : "bg-gray-700/30"
              } hover:bg-gray-700/50 transition-colors`}
              animate={{
                backgroundColor: updatedSymbol === item.symbol ? "rgba(75, 85, 99, 0.5)" : "rgba(55, 65, 81, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{item.symbol}</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(item.trend)}
                  <Badge variant="outline" className="text-xs">
                    {item.trend.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-400 mb-1">Strength</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${getTrendColor(item.trend)}`}
                    style={{ width: `${item.strength}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.strength}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

