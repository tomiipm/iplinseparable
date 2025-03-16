"use client"

import { useEffect, useRef } from "react"

export function HomeBackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Define chart dimensions first (as let so they can be updated)
    let width = canvas.width * 0.8
    let height = canvas.height * 0.3
    let startX = canvas.width * 0.1
    let startY = canvas.height * 0.3

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Recalculate dimensions after resize
      width = canvas.width * 0.8
      height = canvas.height * 0.3
      startX = canvas.width * 0.1
      startY = canvas.height * 0.3

      // Regenerate patterns with new dimensions
      generatePatternPoints()
    }

    // Chart patterns to animate
    const patterns = [
      { name: "head-and-shoulders", points: [] as { x: number; y: number }[] },
      { name: "double-top", points: [] as { x: number; y: number }[] },
      { name: "triangle", points: [] as { x: number; y: number }[] },
      { name: "flag", points: [] as { x: number; y: number }[] },
      { name: "channel", points: [] as { x: number; y: number }[] },
    ]

    // Generate points for each pattern
    const generatePatternPoints = () => {
      // Head and shoulders pattern
      const headAndShoulders = []

      for (let i = 0; i <= 60; i++) {
        let y
        if (i <= 10) {
          // Left shoulder
          y = startY - height * 0.5 * Math.sin((i / 10) * Math.PI)
        } else if (i <= 30) {
          // Head
          y = startY - height * Math.sin(((i - 10) / 20) * Math.PI)
        } else if (i <= 40) {
          // Right shoulder
          y = startY - height * 0.5 * Math.sin(((i - 30) / 10) * Math.PI)
        } else {
          // Neckline with slight trend
          y = startY + (i - 40) * 0.5
        }
        headAndShoulders.push({ x: startX + (width / 60) * i, y })
      }
      patterns[0].points = headAndShoulders

      // Double top pattern
      const doubleTop = []
      for (let i = 0; i <= 60; i++) {
        let y
        if (i <= 15) {
          // First rise
          y = startY - height * (i / 15)
        } else if (i <= 25) {
          // First drop
          y = startY - height + height * 0.3 * ((i - 15) / 10)
        } else if (i <= 40) {
          // Second rise
          y = startY - height * 0.7 - height * 0.3 * ((i - 25) / 15)
        } else {
          // Final drop
          y = startY - height + height * ((i - 40) / 20)
        }
        doubleTop.push({ x: startX + (width / 60) * i, y: y + canvas.height * 0.3 })
      }
      patterns[1].points = doubleTop

      // Triangle pattern
      const triangle = []
      for (let i = 0; i <= 40; i++) {
        const topLine = startY - height * 0.8 + (height * 0.8 * i) / 40
        const bottomLine = startY - (height * 0.2 * i) / 40

        // Oscillate between top and bottom lines
        const oscillation = Math.sin((i / 40) * Math.PI * 6) * (height * 0.1) * (1 - i / 40)
        triangle.push({
          x: startX + (width / 40) * i,
          y: (topLine + bottomLine) / 2 + oscillation + canvas.height * 0.3,
        })
      }
      patterns[2].points = triangle

      // Flag pattern (bull flag)
      const flag = []
      // Strong uptrend
      for (let i = 0; i <= 20; i++) {
        flag.push({
          x: startX + (width / 60) * i,
          y: startY + height - (height * i) / 20 + canvas.height * 0.1,
        })
      }
      // Flag consolidation
      for (let i = 0; i <= 20; i++) {
        flag.push({
          x: startX + (width / 60) * (i + 20),
          y: startY + height * 0.1 * Math.sin((i / 20) * Math.PI * 3) + canvas.height * 0.1,
        })
      }
      // Continuation
      for (let i = 0; i <= 20; i++) {
        flag.push({
          x: startX + (width / 60) * (i + 40),
          y: startY - (height * i) / 20 + canvas.height * 0.1,
        })
      }
      patterns[3].points = flag

      // Channel pattern
      const channel = []
      for (let i = 0; i <= 60; i++) {
        const trend = (height * 0.5 * i) / 60
        const oscillation = Math.sin((i / 60) * Math.PI * 4) * height * 0.2
        channel.push({
          x: startX + (width / 60) * i,
          y: startY - trend + oscillation - canvas.height * 0.1,
        })
      }
      patterns[4].points = channel
    }

    // Call resizeCanvas to set initial dimensions
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let progress = 0
    let activePatternIndex = 0
    let fadeOpacity = 0
    let patternComplete = false
    const animationSpeed = 0.005
    const patternDuration = 200 // frames per pattern

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set chart style
      ctx.lineWidth = 2.5 // Increased from 1.5
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * fadeOpacity})` // Increased from 0.1
      ctx.fillStyle = `rgba(59, 130, 246, ${0.15 * fadeOpacity})` // Increased from 0.05

      const activePattern = patterns[activePatternIndex]
      const points = activePattern.points

      if (points.length === 0) return

      // Calculate how many points to draw based on progress
      const pointsToDraw = Math.floor(points.length * progress)

      if (pointsToDraw > 1) {
        // Draw line
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        for (let i = 1; i < pointsToDraw; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }

        ctx.stroke()

        // Draw area under the curve
        ctx.beginPath()
        ctx.moveTo(points[0].x, canvas.height)
        ctx.lineTo(points[0].x, points[0].y)

        for (let i = 1; i < pointsToDraw; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }

        ctx.lineTo(points[pointsToDraw - 1].x, canvas.height)
        ctx.closePath()
        ctx.fill()

        // Draw pattern recognition indicators when pattern is complete
        if (patternComplete && fadeOpacity > 0.7) {
          // Draw pattern name
          ctx.font = "bold 16px Arial" // Increased size and made bold
          ctx.fillStyle = `rgba(74, 222, 128, ${fadeOpacity})`
          ctx.fillText(
            activePattern.name.toUpperCase().replace("-", " "),
            points[Math.floor(points.length / 2)].x - 60,
            points[Math.floor(points.length / 2)].y - 25,
          )

          // Draw pattern markers
          ctx.strokeStyle = `rgba(74, 222, 128, ${fadeOpacity})`
          ctx.lineWidth = 2 // Added line width for markers
          ctx.setLineDash([5, 3])

          if (activePattern.name === "head-and-shoulders") {
            // Mark shoulders and head
            drawCircle(points[5].x, points[5].y, 8) // Increased from 5
            drawCircle(points[20].x, points[20].y, 8) // Increased from 5
            drawCircle(points[35].x, points[35].y, 8) // Increased from 5

            // Draw neckline
            ctx.beginPath()
            ctx.moveTo(points[10].x, points[10].y)
            ctx.lineTo(points[50].x, points[50].y)
            ctx.stroke()
          } else if (activePattern.name === "double-top") {
            // Mark tops
            drawCircle(points[15].x, points[15].y, 8)
            drawCircle(points[40].x, points[40].y, 8)
          } else if (activePattern.name === "triangle") {
            // Draw triangle lines
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y - 20)
            ctx.lineTo(points[40].x, points[40].y)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y + 20)
            ctx.lineTo(points[40].x, points[40].y)
            ctx.stroke()
          } else if (activePattern.name === "flag") {
            // Draw flag channel
            const channelHeight = 20
            ctx.beginPath()
            ctx.moveTo(points[20].x, points[20].y - channelHeight / 2)
            ctx.lineTo(points[40].x, points[40].y - channelHeight / 2)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(points[20].x, points[20].y + channelHeight / 2)
            ctx.lineTo(points[40].x, points[40].y + channelHeight / 2)
            ctx.stroke()
          } else if (activePattern.name === "channel") {
            // Draw channel lines
            const channelHeight = height * 0.4

            // Upper channel
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y - channelHeight / 2)
            for (let i = 1; i < pointsToDraw; i++) {
              ctx.lineTo(points[i].x, points[i].y - channelHeight / 2)
            }
            ctx.stroke()

            // Lower channel
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y + channelHeight / 2)
            for (let i = 1; i < pointsToDraw; i++) {
              ctx.lineTo(points[i].x, points[i].y + channelHeight / 2)
            }
            ctx.stroke()
          }

          ctx.setLineDash([])
        }
      }

      // Update animation progress
      if (!patternComplete) {
        progress += animationSpeed
        fadeOpacity = Math.min(1, progress * 2)

        if (progress >= 1) {
          patternComplete = true
          setTimeout(() => {
            fadeOut()
          }, 2000)
        }
      }
    }

    // Helper function to draw circles
    const drawCircle = (x: number, y: number, radius: number) => {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = `rgba(74, 222, 128, ${0.3 * fadeOpacity})` // Add fill
      ctx.fill() // Fill the circles
    }

    // Fade out current pattern and switch to next
    const fadeOut = () => {
      const fadeInterval = setInterval(() => {
        fadeOpacity -= 0.05

        if (fadeOpacity <= 0) {
          clearInterval(fadeInterval)
          progress = 0
          patternComplete = false
          activePatternIndex = (activePatternIndex + 1) % patterns.length
          generatePatternPoints() // Regenerate patterns for variety
        }
      }, 50)
    }

    // Start animation loop
    const animate = () => {
      draw()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none opacity-60 z-0" />
}

