import type { Signal } from "@/types/signal"

export class SignalGenerator {
  private async analyzeMarket(symbol: string): Promise<Signal> {
    // Get base price for each symbol
    const basePrice = this.getBasePrice(symbol)

    // Determine signal type (BUY or SELL) with slightly higher probability for BUY
    const type = Math.random() > 0.4 ? "BUY" : "SELL"

    // Calculate entry price with small random variation
    const entryPrice = basePrice * (1 + (Math.random() - 0.5) * 0.002)

    // Calculate take profit and stop loss based on signal type
    let tp1, tp2, sl

    if (type === "BUY") {
      // For BUY signals, TP is higher and SL is lower
      tp1 = entryPrice * (1 + 0.001 + Math.random() * 0.001) // 0.1-0.2% higher
      tp2 = entryPrice * (1 + 0.002 + Math.random() * 0.002) // 0.2-0.4% higher
      sl = entryPrice * (1 - 0.0005 - Math.random() * 0.0005) // 0.05-0.1% lower
    } else {
      // For SELL signals, TP is lower and SL is higher
      tp1 = entryPrice * (1 - 0.001 - Math.random() * 0.001) // 0.1-0.2% lower
      tp2 = entryPrice * (1 - 0.002 - Math.random() * 0.002) // 0.2-0.4% lower
      sl = entryPrice * (1 + 0.0005 + Math.random() * 0.0005) // 0.05-0.1% higher
    }

    // Generate confidence score (70-95%)
    const confidence = 70 + Math.floor(Math.random() * 25)

    // Format prices based on symbol
    const formattedEntryPrice = this.formatPrice(entryPrice, symbol)
    const formattedTp1 = this.formatPrice(tp1, symbol)
    const formattedTp2 = this.formatPrice(tp2, symbol)
    const formattedSl = this.formatPrice(sl, symbol)

    return {
      symbol,
      type,
      entryPrice: formattedEntryPrice,
      tp1: formattedTp1,
      tp2: formattedTp2,
      sl: formattedSl,
      timestamp: new Date().toISOString(),
      confidence,
    }
  }

  private getBasePrice(symbol: string): number {
    // Realistic base prices for common forex pairs and assets
    switch (symbol) {
      case "EURUSD":
        return 1.08
      case "GBPUSD":
        return 1.26
      case "USDJPY":
        return 149.5
      case "XAUUSD": // Gold
        return 2300
      case "US30": // Dow Jones
        return 39000
      default:
        return 1.0
    }
  }

  private formatPrice(price: number, symbol: string): number {
    // Format price based on symbol convention
    switch (symbol) {
      case "XAUUSD":
        return Number.parseFloat(price.toFixed(2)) // Gold typically shows 2 decimal places
      case "US30":
        return Number.parseFloat(price.toFixed(0)) // Indices typically show 0 decimal places
      default:
        return Number.parseFloat(price.toFixed(5)) // Forex pairs typically show 5 decimal places
    }
  }

  public async generateSignals(symbols: string[]): Promise<Signal[]> {
    return Promise.all(symbols.map((symbol) => this.analyzeMarket(symbol)))
  }
}

