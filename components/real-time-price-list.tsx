"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Price = {
  symbol: string
  bid: number
  ask: number
  change: number
  lastUpdated: number
}

export function RealTimePriceList() {
  const [prices, setPrices] = useState<Price[]>([
    { symbol: "EURUSD", bid: 1.08, ask: 1.0802, change: 0.12, lastUpdated: Date.now() },
    { symbol: "GBPUSD", bid: 1.26, ask: 1.2602, change: -0.05, lastUpdated: Date.now() },
    { symbol: "USDJPY", bid: 149.5, ask: 149.52, change: 0.23, lastUpdated: Date.now() },
    { symbol: "XAUUSD", bid: 2300.5, ask: 2300.8, change: 0.45, lastUpdated: Date.now() },
    { symbol: "US30", bid: 39000, ask: 39002, change: -0.18, lastUpdated: Date.now() },
  ])

  const [updatedSymbol, setUpdatedSymbol] = useState<string | null>(null)

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      setPrices((prevPrices) => {
        // Randomly select 1-3 symbols to update
        const numSymbolsToUpdate = Math.floor(Math.random() * 3) + 1
        const symbolsToUpdate = [...prevPrices]
          .sort(() => 0.5 - Math.random())
          .slice(0, numSymbolsToUpdate)
          .map((price) => price.symbol)

        // Update the selected symbols
        const updatedPrices = prevPrices.map((price) => {
          if (symbolsToUpdate.includes(price.symbol)) {
            const changeDirection = Math.random() > 0.5 ? 1 : -1
            const changeAmount = getChangeAmount(price.symbol)
            const newBid = price.bid + changeDirection * changeAmount
            const newAsk = newBid + getSpread(price.symbol)
            const newChange = price.change + changeDirection * (Math.random() * 0.05)

            return {
              ...price,
              bid: formatPrice(newBid, price.symbol),
              ask: formatPrice(newAsk, price.symbol),
              change: Number.parseFloat(newChange.toFixed(2)),
              lastUpdated: Date.now(),
            }
          }
          return price
        })

        // Set the most recently updated symbol for animation
        if (symbolsToUpdate.length > 0) {
          setUpdatedSymbol(symbolsToUpdate[0])
          // Reset the updated symbol after animation
          setTimeout(() => setUpdatedSymbol(null), 1000)
        }

        return updatedPrices
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Helper functions for realistic price movements
  const getChangeAmount = (symbol: string): number => {
    switch (symbol) {
      case "EURUSD":
      case "GBPUSD":
        return Math.random() * 0.0005 // 0-5 pips for major pairs
      case "USDJPY":
        return Math.random() * 0.05 // 0-5 pips for JPY pairs
      case "XAUUSD":
        return Math.random() * 0.5 // 0-50 cents for gold
      case "US30":
        return Math.random() * 5 // 0-5 points for indices
      default:
        return Math.random() * 0.0005
    }
  }

  const getSpread = (symbol: string): number => {
    switch (symbol) {
      case "EURUSD":
      case "GBPUSD":
        return 0.0002 // 2 pips spread
      case "USDJPY":
        return 0.02 // 2 pips spread
      case "XAUUSD":
        return 0.3 // 30 cents spread
      case "US30":
        return 2 // 2 points spread
      default:
        return 0.0002
    }
  }

  const formatPrice = (price: number, symbol: string): number => {
    switch (symbol) {
      case "EURUSD":
      case "GBPUSD":
        return Number.parseFloat(price.toFixed(5))
      case "USDJPY":
        return Number.parseFloat(price.toFixed(3))
      case "XAUUSD":
        return Number.parseFloat(price.toFixed(2))
      case "US30":
        return Number.parseFloat(price.toFixed(0))
      default:
        return Number.parseFloat(price.toFixed(5))
    }
  }

  return (
    <Card className="h-full bg-gray-800/50 backdrop-blur border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">Live Prices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prices.map((price) => (
            <motion.div
              key={price.symbol}
              className={`p-3 rounded-lg ${
                updatedSymbol === price.symbol
                  ? price.change >= 0
                    ? "bg-green-900/30"
                    : "bg-red-900/30"
                  : "bg-gray-700/30"
              } hover:bg-gray-700/50 transition-colors cursor-pointer`}
              animate={{
                backgroundColor:
                  updatedSymbol === price.symbol
                    ? price.change >= 0
                      ? "rgba(22, 101, 52, 0.3)"
                      : "rgba(127, 29, 29, 0.3)"
                    : "rgba(55, 65, 81, 0.3)",
              }}
              transition={{ duration: 0.5 }}
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
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${price.symbol}-${price.bid}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className={price.change >= 0 ? "text-green-400" : "text-red-400"}
                    >
                      {price.bid}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div>
                  <div className="text-gray-400">Ask</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${price.symbol}-${price.ask}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className={price.change >= 0 ? "text-green-400" : "text-red-400"}
                    >
                      {price.ask}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

