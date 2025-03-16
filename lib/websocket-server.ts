import { Server } from "socket.io"
import type { Server as HTTPServer } from "http"
import { SignalGenerator } from "@/lib/signal-generator"
import type { Signal } from "@/types/signal"

let io: Server | null = null

export function initializeWebSocketServer(httpServer: HTTPServer) {
  if (!io) {
    io = new Server(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    })

    const signalGenerator = new SignalGenerator()
    const symbols = ["EURUSD", "GBPUSD", "USDJPY", "XAUUSD", "US30"]

    // Store active signals
    const activeSignals: Record<string, Signal> = {}

    // Generate new signals every 30 seconds
    const generateSignalsInterval = setInterval(async () => {
      try {
        // Randomly select 1-2 symbols to update
        const numSymbolsToUpdate = Math.floor(Math.random() * 2) + 1
        const symbolsToUpdate = [...symbols].sort(() => 0.5 - Math.random()).slice(0, numSymbolsToUpdate)

        const newSignals = await signalGenerator.generateSignals(symbolsToUpdate)

        // Update active signals
        newSignals.forEach((signal) => {
          activeSignals[signal.symbol] = signal
        })

        // Broadcast new signals to all connected clients
        io?.emit("signals:update", newSignals)

        console.log(`Generated ${newSignals.length} new signals`)
      } catch (error) {
        console.error("Error generating signals:", error)
      }
    }, 30000) // Every 30 seconds

    // Send signal updates to newly connected clients
    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id)

      // Send all active signals to the newly connected client
      const currentSignals = Object.values(activeSignals)
      if (currentSignals.length > 0) {
        socket.emit("signals:initial", currentSignals)
      }

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id)
      })
    })

    // Clean up on server shutdown
    process.on("SIGTERM", () => {
      clearInterval(generateSignalsInterval)
      io?.close()
      io = null
    })
  }

  return io
}

export function getIO(): Server | null {
  return io
}

