"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Leaf } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { PremiumRecyclingVisual } from "@/components/premium-recycling-visual"

export function PremiumLandingHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Animated Abstract Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="container relative z-20 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            className="space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-green-500/20 border border-amber-500/30 text-amber-400 backdrop-blur-xl">
                <Sparkles className="w-4 h-4" />
                AI-Powered Sustainability Platform
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-6xl md:text-8xl font-black leading-none tracking-tight"
              >
                <span className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                  SMART
                </span>
                <span className="block bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-2xl">
                  WASTE
                </span>
                <span className="block text-white/90 text-5xl md:text-6xl font-light">INTELLIGENCE</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light"
              >
                Revolutionizing waste management through{" "}
                <span className="text-green-400 font-medium">AI-powered classification</span>,{" "}
                <span className="text-amber-400 font-medium">IoT monitoring</span>, and{" "}
                <span className="text-green-400 font-medium">blockchain verification</span> for a sustainable future.
              </motion.p>
            </div>

            {/* Feature Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center gap-8"
            >
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">98% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Real-time Processing</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold px-8 py-4 text-lg shadow-2xl shadow-amber-500/25 border-0"
                asChild
              >
                <Link href="/demo" className="flex items-center gap-3">
                  <span className="relative z-10">Try Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  {/* Metallic shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 font-semibold px-8 py-4 text-lg backdrop-blur-xl"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-3">
                  <span>Get Started</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800"
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-gray-400 mt-1">Items Processed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-sm text-gray-400 mt-1">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-green-500 bg-clip-text text-transparent">
                  2.3M
                </div>
                <div className="text-sm text-gray-400 mt-1">CO₂ Reduced</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 60 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            <PremiumRecyclingVisual />
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
    </section>
  )
}
