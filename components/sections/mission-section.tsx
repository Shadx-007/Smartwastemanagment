"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Recycle, Brain, Shield, Globe } from "lucide-react"
import { AnimatedTorusBackground } from "@/components/animated-torus-background"

export function MissionSection() {
  const missions = [
    {
      icon: Recycle,
      title: "Sustainable Future",
      description: "Reducing global waste through intelligent classification and optimized recycling processes.",
      color: "text-green-400",
      bgColor: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms that continuously improve waste sorting accuracy.",
      color: "text-amber-400",
      bgColor: "from-amber-500/10 to-yellow-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable tracking and verification of waste processing for complete transparency.",
      color: "text-green-400",
      bgColor: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connecting communities worldwide to create a unified approach to waste management.",
      color: "text-amber-400",
      bgColor: "from-amber-500/10 to-yellow-500/10",
      borderColor: "border-amber-500/20",
    },
  ]

  return (
    <section className="relative min-h-screen bg-black flex items-center py-20">
      {/* Animated Background */}
      <AnimatedTorusBackground />

      {/* Content Overlay */}
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-amber-500/20 border border-green-500/30 text-green-400 backdrop-blur-xl text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Our Mission
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Transforming Waste
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Into Opportunity
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're building the future of waste management through cutting-edge AI technology, blockchain transparency,
            and global collaboration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full bg-gradient-to-br ${mission.bgColor} border ${mission.borderColor} backdrop-blur-xl hover:scale-105 transition-all duration-300`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${mission.bgColor} border ${mission.borderColor} flex items-center justify-center`}
                  >
                    <mission.icon className={`w-8 h-8 ${mission.color}`} />
                  </div>

                  <h3 className={`text-xl font-bold mb-3 ${mission.color}`}>{mission.title}</h3>

                  <p className="text-gray-300 text-sm leading-relaxed">{mission.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
