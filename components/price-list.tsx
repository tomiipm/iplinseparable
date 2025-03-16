"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

type Price = {
  symbol: string
  bid: number
  ask: number
  change: number
}

export function PriceList() {
  const [prices, setPrices] = useState<Price[]>([
    { symbol: "EURUSD", bid: 1.095, ask: 1.0952, change: 0.12 },
    { symbol: "GBPUSD", bid: 1.265, ask: 1.2652, change: -0.05 },
    { symbol: "USDJPY", bid: 149.5, ask: 149.52, change: 0.23 },
    { symbol: "XAUUSD", bid: 1950.5, ask: 1950.8, change: 0.45 },
    { symbol: "US30", bid: 33500, ask: 33502, change: -0.18 },
  ])

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      setPrices((prevPrices) =>
        prevPrices.map((price) => {
          const change = (Math.random() - 0.5) * 0.1
          const newBid = price.bid + change
          return {
            ...price,
            bid: Number.parseFloat(newBid.toFixed(4)),
            ask: Number.parseFloat((newBid + 0.0002).toFixed(4)),
            change: Number.parseFloat((price.change + change).toFixed(2)),
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full bg-gray-800/50 backdrop-blur border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">Price List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prices.map((price) => (
            <div
              key={price.symbol}
              className="p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{price.symbol}</span>
                <span className={`flex items-center ${price.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {price.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(price.change)}%
                </span>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div>
                  <div className="text-gray-400">Bid</div>
                  <div>{price.bid}</div>
                </div>
                <div>
                  <div className="text-gray-400">Ask</div>
                  <div>{price.ask}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

