"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Leaf, Recycle, Zap, Globe, TreePine, Droplets } from "lucide-react"

const impactStats = [
  {
    icon: Recycle,
    title: "Waste Recycled",
    value: 12500,
    unit: "Tons",
    color: "from-green-400 to-emerald-500",
    description: "Total waste successfully recycled through our AI system",
  },
  {
    icon: TreePine,
    title: "Trees Saved",
    value: 8750,
    unit: "Trees",
    color: "from-emerald-400 to-green-600",
    description: "Equivalent trees saved through recycling efforts",
  },
  {
    icon: Zap,
    title: "Energy Saved",
    value: 2340,
    unit: "MWh",
    color: "from-amber-400 to-yellow-500",
    description: "Energy conserved through efficient waste processing",
  },
  {
    icon: Globe,
    title: "CO₂ Reduced",
    value: 4680,
    unit: "Tons",
    color: "from-green-500 to-teal-500",
    description: "Carbon emissions prevented through smart waste management",
  },
  {
    icon: Droplets,
    title: "Water Saved",
    value: 156000,
    unit: "Liters",
    color: "from-blue-400 to-cyan-500",
    description: "Water resources conserved through recycling processes",
  },
  {
    icon: Leaf,
    title: "Landfill Diverted",
    value: 18900,
    unit: "Tons",
    color: "from-green-400 to-lime-500",
    description: "Waste diverted from landfills to recycling facilities",
  },
]

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toLocaleString()}</span>
}

export function EcoImpactSection() {
  const [statsWithImpact, setStatsWithImpact] = useState(
    impactStats.map(stat => ({ ...stat, randomImpact: 0 }))
  )

  useEffect(() => {
    setStatsWithImpact(prev =>
      prev.map(stat => ({
        ...stat,
        randomImpact: Math.floor(Math.random() * 20) + 80,
      }))
    )
  }, [])

  return (
    <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-white">Environmental</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-amber-500 bg-clip-text text-transparent">
              Impact Metrics
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Real-time tracking of our positive environmental impact through intelligent waste management and sustainable
            practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsWithImpact.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700 hover:border-green-500/30 transition-all duration-500 hover:scale-105">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                />

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-8 h-8 text-black" />
                  </div>

                  {/* Stats */}
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span
                        className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        <AnimatedCounter value={stat.value} />
                      </span>
                      <span className="text-xl text-gray-400 font-medium">{stat.unit}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      {stat.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{stat.description}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Impact Level</span>
                      <span className="text-green-400 font-medium">{stat.randomImpact}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.randomImpact}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1.5 }}
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-12 rounded-3xl bg-gradient-to-r from-green-500/10 to-amber-500/10 backdrop-blur-xl border border-green-500/20">
            <h3 className="text-4xl font-bold text-white mb-6">
              <span className="text-green-400">98.7%</span> Efficiency Rate
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl">
              Our AI-powered system consistently achieves industry-leading efficiency rates, maximizing environmental
              impact while minimizing operational costs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
