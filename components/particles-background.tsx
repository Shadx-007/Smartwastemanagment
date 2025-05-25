"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDarkTheme = resolvedTheme === "dark"

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Particle properties
    const particleCount = Math.min(window.innerWidth / 10, 100) // Responsive particle count
    const particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      speed: number
      direction: number
      opacity: number
      pulse: number
    }> = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 0.5
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: isDarkTheme
          ? `rgba(${255}, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 50)}, 0.8)`
          : `rgba(${255}, ${Math.floor(Math.random() * 50) + 200}, ${Math.floor(Math.random() * 100) + 100}, 0.8)`,
        speed: Math.random() * 0.2 + 0.1,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * 0.04 + 0.02,
      })
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        // Update position
        particle.x += Math.cos(particle.direction) * particle.speed
        particle.y += Math.sin(particle.direction) * particle.speed

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Pulsing effect
        particle.opacity += Math.sin(Date.now() * particle.pulse) * 0.01
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity))

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 4,
        )

        // Set gradient colors based on theme
        const particleColor = particle.color.substring(0, particle.color.lastIndexOf(","))
        gradient.addColorStop(0, `${particleColor}, ${particle.opacity})`)
        gradient.addColorStop(1, `${particleColor}, 0)`)

        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw connections between nearby particles
      ctx.strokeStyle = isDarkTheme ? "rgba(255, 120, 50, 0.1)" : "rgba(255, 215, 0, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />
}
