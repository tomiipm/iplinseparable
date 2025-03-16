export type SignalType = "BUY" | "SELL"

export interface Signal {
  symbol: string
  type: SignalType
  entryPrice: number
  tp1: number
  tp2: number
  sl: number
  timestamp: string
  confidence: number
}

