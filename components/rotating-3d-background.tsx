"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export function Rotating3DBackground() {
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
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGeometry = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set colors based on theme
      const isDark = theme === "dark"
      const primaryColor = isDark ? "rgba(34, 197, 94, 0.1)" : "rgba(34, 197, 94, 0.05)"
      const secondaryColor = isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"
      const accentColor = isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)"

      // Draw rotating geometric shapes
      for (let i = 0; i < 6; i++) {
        const angle = (time * 0.001 + (i * Math.PI) / 3) % (Math.PI * 2)
        const radius = 200 + Math.sin(time * 0.002 + i) * 50
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(time * 0.003 + i)

        // Draw hexagon
        ctx.beginPath()
        for (let j = 0; j < 6; j++) {
          const hexAngle = (j * Math.PI) / 3
          const hexX = Math.cos(hexAngle) * 30
          const hexY = Math.sin(hexAngle) * 30
          if (j === 0) ctx.moveTo(hexX, hexY)
          else ctx.lineTo(hexX, hexY)
        }
        ctx.closePath()

        const colors = [primaryColor, secondaryColor, accentColor]
        ctx.fillStyle = colors[i % 3]
        ctx.fill()
        ctx.strokeStyle = colors[i % 3].replace("0.1", "0.2").replace("0.05", "0.1")
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
      }

      // Draw connecting lines
      ctx.strokeStyle = isDark ? "rgba(100, 116, 139, 0.1)" : "rgba(100, 116, 139, 0.05)"
      ctx.lineWidth = 1

      for (let i = 0; i < 5; i++) {
        const angle1 = (time * 0.001 + (i * Math.PI) / 3) % (Math.PI * 2)
        const angle2 = (time * 0.001 + ((i + 1) * Math.PI) / 3) % (Math.PI * 2)
        const radius1 = 200 + Math.sin(time * 0.002 + i) * 50
        const radius2 = 200 + Math.sin(time * 0.002 + i + 1) * 50

        const x1 = centerX + Math.cos(angle1) * radius1
        const y1 = centerY + Math.sin(angle1) * radius1
        const x2 = centerX + Math.cos(angle2) * radius2
        const y2 = centerY + Math.sin(angle2) * radius2

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Draw floating particles
      for (let i = 0; i < 20; i++) {
        const particleX = centerX + Math.cos(time * 0.001 + i * 0.5) * (300 + i * 10)
        const particleY = centerY + Math.sin(time * 0.0015 + i * 0.3) * (200 + i * 8)

        ctx.beginPath()
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 197, 94, 0.2)"
        ctx.fill()
      }
    }

    const animate = () => {
      time += 16
      drawGeometry()
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" style={{ background: "transparent" }} />
  )
}
