"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react"

type TrendItem = {
  symbol: string
  trend: "up" | "down" | "neutral"
  strength: number
}

export function TrendPanel() {
  const trends: TrendItem[] = [
    { symbol: "EURUSD", trend: "up", strength: 75 },
    { symbol: "GBPUSD", trend: "down", strength: 60 },
    { symbol: "USDJPY", trend: "up", strength: 85 },
    { symbol: "XAUUSD", trend: "neutral", strength: 40 },
    { symbol: "US30", trend: "down", strength: 65 },
  ]

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
        <CardTitle className="text-lg">Trend Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((item) => (
            <div key={item.symbol} className="p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
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
                  <div
                    className={`h-2 rounded-full ${getTrendColor(item.trend)}`}
                    style={{ width: `${item.strength}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

