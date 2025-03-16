"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react"

type Signal = {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  entryPrice: number
  tp1: number
  tp2: number
  sl: number
  status: "TP1_HIT" | "TP2_HIT" | "SL_HIT" | "ACTIVE"
  profit: number
  timestamp: string
}

export function SignalHistory() {
  const [filter, setFilter] = useState("all")

  // Mock data for signal history
  const signals: Signal[] = [
    {
      id: "1",
      symbol: "EURUSD",
      type: "BUY",
      entryPrice: 1.095,
      tp1: 1.1,
      tp2: 1.105,
      sl: 1.09,
      status: "TP2_HIT",
      profit: 100,
      timestamp: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      symbol: "GBPUSD",
      type: "SELL",
      entryPrice: 1.265,
      tp1: 1.26,
      tp2: 1.255,
      sl: 1.27,
      status: "SL_HIT",
      profit: -50,
      timestamp: "2023-05-14T14:45:00Z",
    },
    {
      id: "3",
      symbol: "XAUUSD",
      type: "BUY",
      entryPrice: 1950.5,
      tp1: 1960.0,
      tp2: 1970.0,
      sl: 1940.0,
      status: "TP1_HIT",
      profit: 95,
      timestamp: "2023-05-13T09:15:00Z",
    },
    {
      id: "4",
      symbol: "US30",
      type: "BUY",
      entryPrice: 33500,
      tp1: 33600,
      tp2: 33700,
      sl: 33400,
      status: "ACTIVE",
      profit: 0,
      timestamp: "2023-05-12T16:20:00Z",
    },
    {
      id: "5",
      symbol: "USDJPY",
      type: "SELL",
      entryPrice: 149.5,
      tp1: 149.0,
      tp2: 148.5,
      sl: 150.0,
      status: "TP2_HIT",
      profit: 120,
      timestamp: "2023-05-11T11:10:00Z",
    },
  ]

  const filteredSignals =
    filter === "all"
      ? signals
      : signals.filter((signal) => {
          if (filter === "profit") return signal.profit > 0
          if (filter === "loss") return signal.profit < 0
          if (filter === "active") return signal.status === "ACTIVE"
          return true
        })

  const getStatusBadge = (status: Signal["status"]) => {
    switch (status) {
      case "TP1_HIT":
        return <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">TP1 Hit</span>
      case "TP2_HIT":
        return <span className="px-2 py-1 rounded-full bg-green-600/20 text-green-600 text-xs">TP2 Hit</span>
      case "SL_HIT":
        return <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">SL Hit</span>
      case "ACTIVE":
        return <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-500 text-xs">Active</span>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Signal History</CardTitle>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Signals</SelectItem>
            <SelectItem value="profit">Profitable</SelectItem>
            <SelectItem value="loss">Loss</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-7 text-xs text-gray-500 font-medium">
            <div>Symbol</div>
            <div>Type</div>
            <div>Entry</div>
            <div>TP1/TP2</div>
            <div>SL</div>
            <div>Status</div>
            <div>P/L</div>
          </div>
          <div className="space-y-2">
            {filteredSignals.map((signal) => (
              <div key={signal.id} className="grid grid-cols-7 items-center py-2 border-b border-gray-800">
                <div className="font-medium">{signal.symbol}</div>
                <div>
                  {signal.type === "BUY" ? (
                    <div className="flex items-center text-green-500">
                      <ArrowUpCircle className="h-4 w-4 mr-1" />
                      BUY
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <ArrowDownCircle className="h-4 w-4 mr-1" />
                      SELL
                    </div>
                  )}
                </div>
                <div>{signal.entryPrice}</div>
                <div>
                  <div>{signal.tp1}</div>
                  <div className="text-xs text-gray-500">{signal.tp2}</div>
                </div>
                <div>{signal.sl}</div>
                <div>{getStatusBadge(signal.status)}</div>
                <div
                  className={
                    signal.profit > 0 ? "text-green-500" : signal.profit < 0 ? "text-red-500" : "text-gray-500"
                  }
                >
                  {signal.profit > 0 ? "+" : ""}
                  {signal.profit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

