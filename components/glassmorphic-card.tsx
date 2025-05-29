"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  tiltIntensity?: number
}

export function GlassmorphicCard({ children, className, delay = 0, tiltIntensity = 10 }: GlassmorphicCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      whileHover={{
        scale: 1.02,
        rotateY: tiltIntensity,
        rotateX: -tiltIntensity / 2,
        z: 50,
        transition: { duration: 0.3 },
      }}
      className={cn(
        "relative group cursor-pointer",
        "backdrop-blur-xl bg-black/40 dark:bg-black/60",
        "border border-green-500/20 dark:border-green-500/30",
        "rounded-2xl overflow-hidden",
        "shadow-2xl shadow-green-500/10 dark:shadow-green-500/20",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-br before:from-green-500/10 before:to-transparent",
        "before:opacity-0 group-hover:before:opacity-100",
        "before:transition-opacity before:duration-500",
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div className="relative z-10 p-6">{children}</div>

      {/* Green glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-600/10" />
      </div>
    </motion.div>
  )
}
