"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export function RotatingDonutRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = 300
      canvas.height = 300
    }

    const drawDonut = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const outerRadius = 80
      const innerRadius = 50

      // Create rotating gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const hue1 = (time * 0.001) % 1
      const hue2 = (time * 0.001 + 0.3) % 1
      const hue3 = (time * 0.001 + 0.6) % 1

      gradient.addColorStop(0, `hsla(${hue1 * 120 + 120}, 70%, 60%, 0.8)`) // Green to cyan
      gradient.addColorStop(0.5, `hsla(${hue2 * 60 + 240}, 70%, 60%, 0.9)`) // Blue to violet
      gradient.addColorStop(1, `hsla(${hue3 * 120 + 120}, 70%, 60%, 0.8)`) // Back to green

      // Draw outer ring
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true)
      ctx.fillStyle = gradient
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = `hsla(${hue1 * 120 + 120}, 70%, 60%, 0.6)`
      ctx.shadowBlur = 20
      ctx.fill()

      // Draw rotating segments
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.002 + (i * Math.PI) / 4) % (Math.PI * 2)
        const segmentGradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius)
        segmentGradient.addColorStop(0, `hsla(${(hue1 + i * 0.1) * 120 + 120}, 70%, 70%, 0.3)`)
        segmentGradient.addColorStop(1, `hsla(${(hue1 + i * 0.1) * 120 + 120}, 70%, 50%, 0.8)`)

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.arc(0, 0, outerRadius, 0, Math.PI / 4)
        ctx.arc(0, 0, innerRadius, Math.PI / 4, 0, true)
        ctx.closePath()
        ctx.fillStyle = segmentGradient
        ctx.shadowColor = `hsla(${(hue1 + i * 0.1) * 120 + 120}, 70%, 60%, 0.4)`
        ctx.shadowBlur = 15
        ctx.fill()
        ctx.restore()
      }

      // Add inner glow
      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius)
      innerGradient.addColorStop(0, `hsla(${hue2 * 120 + 120}, 70%, 80%, 0.2)`)
      innerGradient.addColorStop(1, `hsla(${hue2 * 120 + 120}, 70%, 60%, 0.1)`)

      ctx.beginPath()
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
      ctx.fillStyle = innerGradient
      ctx.fill()
    }

    const animate = () => {
      time += 16
      drawDonut()
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <div className="flex justify-center my-8">
      <canvas
        ref={canvasRef}
        className="drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 0 30px rgba(34, 197, 94, 0.3))" }}
      />
    </div>
  )
}
