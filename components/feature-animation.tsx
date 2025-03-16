"use client"

import { useEffect, useRef, useState } from "react"

interface FeatureAnimationProps {
  type: "ai-analysis" | "entry-points" | "real-time"
}

export function FeatureAnimation({ type }: FeatureAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles based on animation type
    const initParticles = () => {
      particles = []

      let colors: string[] = []
      let count = 0

      switch (type) {
        case "ai-analysis":
          colors = ["rgba(34, 197, 94, 0.5)", "rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.2)"]
          count = 30
          break
        case "entry-points":
          colors = ["rgba(59, 130, 246, 0.5)", "rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0.2)"]
          count = 20
          break
        case "real-time":
          colors = ["rgba(168, 85, 247, 0.5)", "rgba(168, 85, 247, 0.3)", "rgba(168, 85, 247, 0.2)"]
          count = 25
          break
      }

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 4 + 1
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const speedX = (Math.random() - 0.5) * 1
        const speedY = (Math.random() - 0.5) * 1
        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push(new Particle(x, y, size, speedX, speedY, color))
      }
    }

    // Draw specific animations based on type
    const drawAiAnalysis = () => {
      if (!ctx) return

      // Draw neural network nodes
      const nodeCount = 12
      const nodeSize = 4
      const nodeSpacing = canvas.width / 4

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          const x = nodeSpacing * (i + 1)
          const y = (canvas.height / 5) * (j + 1)

          ctx.fillStyle = `rgba(34, 197, 94, ${Math.random() * 0.5 + 0.5})`
          ctx.beginPath()
          ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
          ctx.fill()

          // Draw connections
          if (i < 2) {
            for (let k = 0; k < 4; k++) {
              const nextX = nodeSpacing * (i + 2)
              const nextY = (canvas.height / 5) * (k + 1)

              ctx.strokeStyle = `rgba(34, 197, 94, ${Math.random() * 0.3})`
              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(nextX, nextY)
              ctx.stroke()
            }
          }
        }
      }
    }

    const drawEntryPoints = () => {
      if (!ctx) return

      // Draw chart
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.8)

      for (let i = 0; i < canvas.width; i += 5) {
        const height = canvas.height * 0.5 + Math.sin(i * 0.02) * 30 + Math.sin(i * 0.005) * 50
        ctx.lineTo(i, height)
      }

      ctx.stroke()

      // Draw entry point
      const entryX = canvas.width * 0.3
      const entryY = canvas.height * 0.5 + Math.sin(entryX * 0.02) * 30 + Math.sin(entryX * 0.005) * 50

      ctx.fillStyle = "rgba(59, 130, 246, 0.8)"
      ctx.beginPath()
      ctx.arc(entryX, entryY, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw TP1
      const tp1X = canvas.width * 0.6
      const tp1Y = canvas.height * 0.3

      ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
      ctx.beginPath()
      ctx.arc(tp1X, tp1Y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw TP2
      const tp2X = canvas.width * 0.8
      const tp2Y = canvas.height * 0.2

      ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
      ctx.beginPath()
      ctx.arc(tp2X, tp2Y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw SL
      const slX = canvas.width * 0.4
      const slY = canvas.height * 0.7

      ctx.fillStyle = "rgba(239, 68, 68, 0.8)"
      ctx.beginPath()
      ctx.arc(slX, slY, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw labels
      ctx.font = "10px Arial"
      ctx.fillStyle = "white"
      ctx.fillText("ENTRY", entryX - 20, entryY - 10)
      ctx.fillText("TP1", tp1X - 10, tp1Y - 10)
      ctx.fillText("TP2", tp2X - 10, tp2Y - 10)
      ctx.fillText("SL", slX - 10, slY - 10)
    }

    const drawRealTime = () => {
      if (!ctx) return

      const now = Date.now()

      // Draw notification pulses
      const pulseCount = 3
      const pulseRadius = 20 + Math.sin(now * 0.002) * 5

      for (let i = 0; i < pulseCount; i++) {
        const x = canvas.width * (0.3 + i * 0.2)
        const y = canvas.height * 0.5
        const alpha = 0.7 - i * 0.2

        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, pulseRadius + i * 10, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw notification icons
      const iconSize = 10
      const iconY = canvas.height * 0.5

      // Icon 1
      const icon1X = canvas.width * 0.3
      ctx.fillStyle = "rgba(168, 85, 247, 0.8)"
      ctx.fillRect(icon1X - iconSize / 2, iconY - iconSize / 2, iconSize, iconSize)

      // Icon 2
      const icon2X = canvas.width * 0.5
      ctx.beginPath()
      ctx.arc(icon2X, iconY, iconSize / 2, 0, Math.PI * 2)
      ctx.fill()

      // Icon 3
      const icon3X = canvas.width * 0.7
      ctx.beginPath()
      ctx.moveTo(icon3X - iconSize / 2, iconY - iconSize / 2)
      ctx.lineTo(icon3X + iconSize / 2, iconY - iconSize / 2)
      ctx.lineTo(icon3X, iconY + iconSize / 2)
      ctx.closePath()
      ctx.fill()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw specific animation
      switch (type) {
        case "ai-analysis":
          drawAiAnalysis()
          break
        case "entry-points":
          drawEntryPoints()
          break
        case "real-time":
          drawRealTime()
          break
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible, type])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

