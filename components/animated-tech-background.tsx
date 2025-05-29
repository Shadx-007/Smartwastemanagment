"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  connections: any[]
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  pulse: number
  pulseSpeed: number
}

export const AnimatedTechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let nodes: Node[] = []

    // Theme detection
    const isLightMode = () => document.documentElement.classList.contains("light")

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles = []
      nodes = []

      // Create floating particles
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          connections: [],
        })
      }

      // Create network nodes
      for (let i = 0; i < 15; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 4 + 2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        })
      }
    }

    const drawParticle = (particle: Particle) => {
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
      const lightMode = isLightMode()

      if (lightMode) {
        gradient.addColorStop(0, `rgba(100, 116, 139, ${particle.opacity * 0.3})`)
        gradient.addColorStop(0.5, `rgba(148, 163, 184, ${particle.opacity * 0.2})`)
        gradient.addColorStop(1, `rgba(148, 163, 184, 0)`)
      } else {
        gradient.addColorStop(0, `rgba(255, 100, 50, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(255, 150, 100, ${particle.opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(255, 200, 150, 0)`)
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawNode = (node: Node, time: number) => {
      const pulseSize = node.size + Math.sin(node.pulse + time * node.pulseSpeed) * 2
      const lightMode = isLightMode()

      // Outer glow
      const outerGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 3)

      if (lightMode) {
        outerGradient.addColorStop(0, `rgba(16, 185, 129, 0.2)`)
        outerGradient.addColorStop(0.3, `rgba(100, 116, 139, 0.1)`)
        outerGradient.addColorStop(1, `rgba(100, 116, 139, 0)`)
      } else {
        outerGradient.addColorStop(0, `rgba(255, 80, 40, 0.8)`)
        outerGradient.addColorStop(0.3, `rgba(255, 120, 80, 0.4)`)
        outerGradient.addColorStop(1, `rgba(255, 160, 120, 0)`)
      }

      ctx.fillStyle = outerGradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2)
      ctx.fill()

      // Inner core
      const coreGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize)

      if (lightMode) {
        coreGradient.addColorStop(0, `rgba(30, 41, 59, 0.4)`)
        coreGradient.addColorStop(0.7, `rgba(16, 185, 129, 0.3)`)
        coreGradient.addColorStop(1, `rgba(100, 116, 139, 0.1)`)
      } else {
        coreGradient.addColorStop(0, `rgba(255, 255, 255, 1)`)
        coreGradient.addColorStop(0.7, `rgba(255, 100, 50, 0.9)`)
        coreGradient.addColorStop(1, `rgba(255, 150, 100, 0.3)`)
      }

      ctx.fillStyle = coreGradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawConnections = () => {
      const lightMode = isLightMode()

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            const opacity = ((200 - distance) / 200) * (lightMode ? 0.1 : 0.3)

            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)

            if (lightMode) {
              gradient.addColorStop(0, `rgba(100, 116, 139, ${opacity})`)
              gradient.addColorStop(0.5, `rgba(148, 163, 184, ${opacity * 0.8})`)
              gradient.addColorStop(1, `rgba(100, 116, 139, ${opacity})`)
            } else {
              gradient.addColorStop(0, `rgba(255, 100, 50, ${opacity})`)
              gradient.addColorStop(0.5, `rgba(255, 150, 100, ${opacity * 0.8})`)
              gradient.addColorStop(1, `rgba(255, 100, 50, ${opacity})`)
            }

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Connect particles to nearby nodes
      particles.forEach((particle) => {
        nodes.forEach((node) => {
          const dx = particle.x - node.x
          const dy = particle.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = ((100 - distance) / 100) * (lightMode ? 0.03 : 0.1)

            if (lightMode) {
              ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`
            } else {
              ctx.strokeStyle = `rgba(255, 150, 100, ${opacity})`
            }

            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(node.x, node.y)
            ctx.stroke()
          }
        })
      })
    }

    const drawGrid = () => {
      const gridSize = 50
      const lightMode = isLightMode()
      const opacity = lightMode ? 0.01 : 0.03

      ctx.strokeStyle = lightMode ? `rgba(100, 116, 139, ${opacity})` : `rgba(255, 100, 50, ${opacity})`
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid
      drawGrid()

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        drawParticle(particle)
      })

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        drawNode(node, time)
      })

      // Draw connections
      drawConnections()

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate(0)

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: isDark
          ? "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)"
          : "radial-gradient(ellipse at center, #f8fafc 0%, #f1f5f9 100%)",
      }}
    />
  )
}
