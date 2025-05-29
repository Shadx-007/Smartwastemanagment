"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { HeroVisual3D } from "@/components/hero-visual-3d"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-amber-500/5" />

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(34,197,94,0.1)_25%,rgba(34,197,94,0.1)_26%,transparent_27%,transparent_74%,rgba(245,158,11,0.1)_75%,rgba(245,158,11,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      <div className="container relative z-20 py-20 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            className="space-y-10"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-green-500/20 border border-amber-500/30 text-amber-400 backdrop-blur-xl text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Next-Generation Waste Intelligence Platform
              </Badge>
            </motion.div>

            {/* Main Headlines - Fixed spacing */}
            <div className="space-y-6 mb-10">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
              >
                <span className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl metallic-text mb-2">
                  SMART
                </span>
                <span className="block bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-2xl">
                  WASTE
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl text-green-300 font-light leading-relaxed max-w-2xl mt-6"
              >
                Revolutionizing waste management through{" "}
                <span className="text-amber-400 font-semibold">AI-powered classification</span>,{" "}
                <span className="text-green-400 font-semibold">real-time monitoring</span>, and{" "}
                <span className="text-amber-400 font-semibold">blockchain verification</span>
              </motion.p>
            </div>

            {/* CTA Buttons - Fixed spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold px-8 py-4 text-lg shadow-2xl shadow-amber-500/25 premium-glow-gold"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-3">
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 font-semibold px-8 py-4 text-lg backdrop-blur-xl premium-glow-green"
                asChild
              >
                <Link href="/demo" className="flex items-center gap-3">
                  <span>Watch Demo</span>
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                </Link>
              </Button>
            </motion.div>

            {/* Rebuilt Stats Grid - 4 columns, responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="pt-8 border-t border-gray-800"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-gray-400 mt-2 text-sm">Items Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    98.7%
                  </div>
                  <div className="text-gray-400 mt-2 text-sm">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-400 to-green-500 bg-clip-text text-transparent">
                    2.3M
                  </div>
                  <div className="text-gray-400 mt-2 text-sm">Tons CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-amber-500 bg-clip-text text-transparent">
                    150+
                  </div>
                  <div className="text-gray-400 mt-2 text-sm">Cities Served</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative h-[500px] lg:h-[600px] canvas-container"
          >
            <HeroVisual3D />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
