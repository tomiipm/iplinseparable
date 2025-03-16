"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function FallbackChart() {
  const [symbol, setSymbol] = useState("EURUSD")
  const [timeframe, setTimeframe] = useState("1h")

  // Generate mock data
  const generateData = () => {
    const data = []
    const basePrice =
      symbol === "EURUSD"
        ? 1.1
        : symbol === "GBPUSD"
          ? 1.26
          : symbol === "USDJPY"
            ? 149.5
            : symbol === "XAUUSD"
              ? 1950
              : 33500

    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setHours(date.getHours() - i)

      const close = basePrice + (Math.random() - 0.5) * (basePrice * 0.01)
      const open = close + (Math.random() - 0.5) * (basePrice * 0.005)
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.002)
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.002)

      data.push({
        time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        open: Number.parseFloat(open.toFixed(4)),
        high: Number.parseFloat(high.toFixed(4)),
        low: Number.parseFloat(low.toFixed(4)),
        close: Number.parseFloat(close.toFixed(4)),
        ma20: Number.parseFloat((basePrice + (Math.random() - 0.5) * (basePrice * 0.005)).toFixed(4)),
      })
    }

    return data.reverse()
  }

  const [data, setData] = useState(generateData())

  useEffect(() => {
    setData(generateData())
  }, [symbol, timeframe])

  return (
    <Card className="p-4 bg-gray-800/50 backdrop-blur border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trading Chart</h2>
        <div className="flex gap-4">
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EURUSD">EUR/USD</SelectItem>
              <SelectItem value="GBPUSD">GBP/USD</SelectItem>
              <SelectItem value="USDJPY">USD/JPY</SelectItem>
              <SelectItem value="XAUUSD">GOLD</SelectItem>
              <SelectItem value="US30">US30</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="4h">4h</SelectItem>
              <SelectItem value="1d">1D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full h-[400px] bg-gray-900/50 rounded-md p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#d1d4dc" tick={{ fill: "#d1d4dc" }} />
            <YAxis domain={["dataMin", "dataMax"]} stroke="#d1d4dc" tick={{ fill: "#d1d4dc" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(19, 23, 34, 0.9)",
                border: "1px solid #2a2e39",
                color: "#d1d4dc",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="close" stroke="#26a69a" dot={false} name="Price" />
            <Line type="monotone" dataKey="ma20" stroke="#2962FF" dot={false} name="MA(20)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Tabs defaultValue="signals" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="signals">Signals</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="signals" className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Latest Signal</div>
              <div className="text-green-500 font-bold text-lg">BUY</div>
              <div className="text-sm">Confidence: 87%</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-blue-400 font-bold text-lg">78%</div>
              <div className="text-sm">Last 30 days</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Active Signals</div>
              <div className="text-yellow-500 font-bold text-lg">3</div>
              <div className="text-sm">Across all pairs</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="indicators" className="p-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">RSI</div>
              <div className="text-white font-bold text-lg">58.3</div>
              <div className="text-sm text-yellow-400">Neutral</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">MACD</div>
              <div className="text-white font-bold text-lg">0.0023</div>
              <div className="text-sm text-green-400">Bullish</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">MA Cross</div>
              <div className="text-white font-bold text-lg">Crossed</div>
              <div className="text-sm text-green-400">Bullish</div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Bollinger</div>
              <div className="text-white font-bold text-lg">Upper</div>
              <div className="text-sm text-red-400">Overbought</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history" className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>BUY EURUSD</span>
              </div>
              <div className="text-green-500">+45 pips</div>
              <div className="text-gray-400 text-sm">2h ago</div>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>SELL GBPUSD</span>
              </div>
              <div className="text-red-500">-12 pips</div>
              <div className="text-gray-400 text-sm">5h ago</div>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>BUY XAUUSD</span>
              </div>
              <div className="text-green-500">+78 pips</div>
              <div className="text-gray-400 text-sm">1d ago</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

