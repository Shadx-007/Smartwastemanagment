"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Globe, Leaf } from "lucide-react"

export function CallToActionSection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(34,197,94,0.1)_25%,rgba(34,197,94,0.1)_26%,transparent_27%,transparent_74%,rgba(245,158,11,0.1)_75%,rgba(245,158,11,0.1)_76%,transparent_77%,transparent)] bg-[length:100px_100px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="relative p-16 rounded-3xl bg-gradient-to-br from-green-500/10 to-amber-500/10 backdrop-blur-xl border border-green-500/20 overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-amber-500/5 blur-xl" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-amber-400" />

            <div className="relative z-10 text-center space-y-12">
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-amber-500 flex items-center justify-center shadow-2xl">
                  <Globe className="w-12 h-12 text-black" />
                </div>
              </motion.div>

              {/* Headlines */}
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-black leading-tight"
                >
                  <span className="text-white">Join the</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-amber-500 bg-clip-text text-transparent">
                    Green Revolution
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                >
                  Transform your waste management with AI-powered intelligence. Start making a real environmental impact
                  today.
                </motion.p>
              </div>

              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-8 text-lg"
              >
                {[
                  { icon: Sparkles, text: "98.7% AI Accuracy" },
                  { icon: Leaf, text: "Real-time Impact Tracking" },
                  { icon: Globe, text: "Global Sustainability" },
                ].map((feature, index) => (
                  <div key={feature.text} className="flex items-center gap-3 text-green-400">
                    <feature.icon className="w-6 h-6" />
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold px-12 py-6 text-xl shadow-2xl shadow-amber-500/25 premium-glow-gold"
                  asChild
                >
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <span className="relative z-10">Start Free Trial</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 font-semibold px-12 py-6 text-xl backdrop-blur-xl premium-glow-green"
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    <span>Contact Sales</span>
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 }}
                className="pt-12 border-t border-gray-800"
              >
                <p className="text-gray-400 text-sm">
                  Trusted by 500+ organizations worldwide • SOC 2 Certified • 99.9% Uptime SLA
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
