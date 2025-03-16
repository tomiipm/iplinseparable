"use client"

import { useState, useEffect } from "react"
import { io, type Socket } from "socket.io-client"
import type { Signal } from "@/types/signal"

export function useRealTimeSignals() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [latestSignal, setLatestSignal] = useState<Signal | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Connect to WebSocket server
    const socketInstance = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")

    socketInstance.on("connect", () => {
      console.log("Connected to signal server")
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from signal server")
      setIsConnected(false)
    })

    // Handle initial signals
    socketInstance.on("signals:initial", (initialSignals: Signal[]) => {
      console.log("Received initial signals:", initialSignals)
      setSignals(initialSignals)

      // Set the most recent signal as the latest
      if (initialSignals.length > 0) {
        const mostRecent = [...initialSignals].sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )[0]
        setLatestSignal(mostRecent)
      }
    })

    // Handle signal updates
    socketInstance.on("signals:update", (newSignals: Signal[]) => {
      console.log("Received new signals:", newSignals)

      // Update signals list
      setSignals((prev) => {
        const updated = [...prev]

        // Update or add new signals
        newSignals.forEach((newSignal) => {
          const existingIndex = updated.findIndex((s) => s.symbol === newSignal.symbol)
          if (existingIndex >= 0) {
            updated[existingIndex] = newSignal
          } else {
            updated.push(newSignal)
          }
        })

        return updated
      })

      // Set the most recent signal as the latest
      if (newSignals.length > 0) {
        setLatestSignal(newSignals[0])
      }
    })

    setSocket(socketInstance)

    // Clean up on unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return {
    signals,
    latestSignal,
    isConnected,
  }
}

