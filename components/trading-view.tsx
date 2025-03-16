"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createChart, ColorType } from "lightweight-charts"

export function TradingView() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [symbol, setSymbol] = useState("EURUSD")
  const [timeframe, setTimeframe] = useState("1h")

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chartContainer = chartContainerRef.current
    const chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: "rgba(19, 23, 34, 0.5)" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.5)" },
        horzLines: { color: "rgba(42, 46, 57, 0.5)" },
      },
      width: chartContainer.clientWidth,
      height: 400,
    })

    // Generate mock data
    const currentDate = new Date()
    const data = Array(100)
      .fill(0)
      .map((_, i) => {
        const date = new Date(currentDate)
        date.setHours(currentDate.getHours() - i)

        const basePrice = 1.1 + Math.random() * 0.1
        const high = basePrice + Math.random() * 0.005
        const low = basePrice - Math.random() * 0.005
        const open = low + Math.random() * (high - low)
        const close = low + Math.random() * (high - low)

        return {
          time: date.getTime() / 1000,
          open,
          high,
          low,
          close,
        }
      })
      .reverse()

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    })

    candlestickSeries.setData(data)

    // Add moving average
    const maLine = chart.addLineSeries({
      color: "#2962FF",
      lineWidth: 2,
    })

    const maData = data.map((item, i, arr) => {
      const lookback = 20
      if (i < lookback - 1) return { time: item.time, value: item.close }

      const sum = arr.slice(i - lookback + 1, i + 1).reduce((acc, val) => acc + val.close, 0)
      return {
        time: item.time,
        value: sum / lookback,
      }
    })

    maLine.setData(maData)

    chart.timeScale().fitContent()

    const handleResize = () => {
      chart.applyOptions({ width: chartContainer.clientWidth })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
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

      <div ref={chartContainerRef} className="w-full h-[400px]" />

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

