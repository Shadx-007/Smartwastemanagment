"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function ErdtreeVisualization() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCanvasReady, setIsCanvasReady] = useState(false)

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions to match display size
    const setCanvasDimensions = () => {
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight

      // Check if the canvas is being displayed
      if (displayWidth === 0 || displayHeight === 0) {
        return false
      }

      // Set canvas dimensions to match display size
      const dpr = window.devicePixelRatio || 1
      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      return true
    }

    // Try to set dimensions, and if successful, mark canvas as ready
    if (setCanvasDimensions()) {
      setIsCanvasReady(true)
    } else {
      // If not successful, try again after a short delay
      const timer = setTimeout(() => {
        if (setCanvasDimensions()) {
          setIsCanvasReady(true)
        }
      }, 100)
      return () => clearTimeout(timer)
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Animation variables
    let animationId: number
    let time = 0

    // Set tree colors based on theme
    const leafColor = isDark ? "#ff9d00" : "#ffd700"
    const trunkColor = isDark ? "#4b2e20" : "#8b5a2b"
    const glowColor = isDark ? "rgba(255, 50, 0, 0.5)" : "rgba(255, 215, 0, 0.3)"

    // Create particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speed: number
      angle: number
      glowing: boolean
      life: number
    }> = []

    // Initialize particles
    const initParticles = () => {
      particles.length = 0 // Clear existing particles
      const centerX = canvas.clientWidth / 2
      const centerY = canvas.clientHeight * 0.6

      for (let i = 0; i < 30; i++) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 1 + 0.5,
          angle: Math.random() * Math.PI * 2,
          glowing: Math.random() > 0.7,
          life: Math.random() * 100 + 50,
        })
      }
    }

    initParticles()

    // Draw trunk
    const drawTrunk = () => {
      const centerX = canvas.clientWidth / 2
      const centerY = canvas.clientHeight
      const trunkHeight = canvas.clientHeight * 0.4

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX, centerY - trunkHeight)
      ctx.strokeStyle = trunkColor
      ctx.lineWidth = 15
      ctx.stroke()

      // Draw branches
      drawBranch(centerX, centerY - trunkHeight, 60, -Math.PI / 4, 4)
      drawBranch(centerX, centerY - trunkHeight, 60, (-Math.PI * 3) / 4, 4)
    }

    // Recursive branch drawing
    const drawBranch = (x: number, y: number, length: number, angle: number, branchWidth: number) => {
      if (branchWidth < 1) return

      ctx.beginPath()
      ctx.moveTo(x, y)
      const endX = x + Math.cos(angle) * length
      const endY = y + Math.sin(angle) * length
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = trunkColor
      ctx.lineWidth = branchWidth
      ctx.stroke()

      if (branchWidth < 2) {
        // Draw leaves/flames at the end of small branches
        drawLeaf(endX, endY, 10 + Math.random() * 5)
        return
      }

      // Draw sub-branches
      drawBranch(endX, endY, length * 0.75, angle - 0.3 - Math.random() * 0.3, branchWidth - 1)
      drawBranch(endX, endY, length * 0.75, angle + 0.3 + Math.random() * 0.3, branchWidth - 1)
    }

    // Draw a leaf or flame
    const drawLeaf = (x: number, y: number, size: number) => {
      try {
        // Add glow effect
        const grd = ctx.createRadialGradient(x, y, 1, x, y, size * 2)
        grd.addColorStop(0, glowColor)
        grd.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(x, y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Draw the actual leaf/flame
        if (isDark) {
          // Flame effect for dark mode
          const flameSize = size * 1.2
          const flameFlicker = 1 + Math.sin(time * 0.1 + x * 0.01) * 0.1
          ctx.beginPath()
          ctx.moveTo(x, y - flameSize * flameFlicker)
          ctx.quadraticCurveTo(x + flameSize / 2, y - flameSize / 2, x, y + flameSize / 2)
          ctx.quadraticCurveTo(x - flameSize / 2, y - flameSize / 2, x, y - flameSize * flameFlicker)
          ctx.fillStyle = leafColor
          ctx.fill()
        } else {
          // Golden leaf for light mode
          ctx.beginPath()
          ctx.arc(x, y, size * (1 + Math.sin(time * 0.05 + x * 0.01) * 0.1), 0, Math.PI * 2)
          ctx.fillStyle = leafColor
          ctx.fill()
        }
      } catch (error) {
        console.error("Error drawing leaf:", error)
      }
    }

    const drawParticles = () => {
      particles.forEach((p, index) => {
        // Update particle
        p.x += Math.cos(p.angle) * p.speed
        p.y += Math.sin(p.angle) * p.speed
        p.life -= 1

        // Add some upward drift for fire effect
        if (isDark) {
          p.y -= 0.5
        }

        // Draw particle
        ctx.beginPath()

        if (p.glowing) {
          try {
            // Glowing particle
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
            grd.addColorStop(0, isDark ? "rgba(255, 150, 0, 0.8)" : "rgba(255, 215, 0, 0.8)")
            grd.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
            ctx.fillStyle = grd
            ctx.fill()
          } catch (error) {
            console.error("Error drawing glowing particle:", error)
          }
        }

        // Main particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? "#ff7700" : "#ffdf00"
        ctx.globalAlpha = Math.max(0, p.life / 100)
        ctx.fill()
        ctx.globalAlpha = 1

        // Reset particle if out of bounds or dead
        if (p.x < 0 || p.x > canvas.clientWidth || p.y < 0 || p.y > canvas.clientHeight || p.life <= 0) {
          p.x = canvas.clientWidth / 2 + (Math.random() - 0.5) * 100
          p.y = canvas.clientHeight * 0.6 + (Math.random() - 0.5) * 100
          p.angle = Math.random() * Math.PI * 2
          p.life = Math.random() * 100 + 50
        }
      })
    }

    // Animation loop
    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        time += 1
        drawTrunk()
        drawParticles()
        animationId = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
        cancelAnimationFrame(animationId)
      }
    }

    // Start animation
    animate()

    // Handle resize
    const handleResize = () => {
      if (setCanvasDimensions()) {
        initParticles()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isDark, isCanvasReady])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-lg aspect-square"
      >
        {/* Glowing background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-3xl" />

        {/* Canvas for the Erdtree */}
        <canvas ref={canvasRef} className="w-full h-full relative z-10" style={{ display: "block" }} />

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border"
          >
            <h2 className="text-2xl font-bold">
              {isDark ? "Enlightened Waste Management" : "Golden Standard in Recycling"}
            </h2>
            <p className="mt-2 text-muted-foreground">Visualizing our impact on the environment</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
