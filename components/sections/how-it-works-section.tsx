"use client"

import { motion } from "framer-motion"
import { Camera, Brain, Recycle, BarChart3, Shield, Zap } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "AI Image Recognition",
    description: "Advanced computer vision analyzes waste items in real-time with 98.7% accuracy",
    details:
      "Our neural networks process thousands of images per second, identifying materials, contamination levels, and optimal sorting paths.",
    color: "from-green-400 to-emerald-500",
  },
  {
    number: "02",
    icon: Brain,
    title: "Smart Classification",
    description: "Machine learning algorithms categorize waste into 15+ distinct categories",
    details:
      "Deep learning models trained on millions of waste samples ensure precise classification across all material types.",
    color: "from-amber-400 to-yellow-500",
  },
  {
    number: "03",
    icon: Recycle,
    title: "Automated Sorting",
    description: "IoT-enabled robotic systems sort waste based on AI recommendations",
    details: "Robotic arms and conveyor systems work in perfect harmony to achieve optimal sorting efficiency.",
    color: "from-green-400 to-emerald-500",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live dashboards provide insights into waste patterns and environmental impact",
    details: "Comprehensive analytics help optimize operations and track sustainability metrics in real-time.",
    color: "from-amber-400 to-yellow-500",
  },
  {
    number: "05",
    icon: Shield,
    title: "Blockchain Verification",
    description: "Immutable ledger tracks waste journey from collection to processing",
    details: "Every step is recorded on blockchain, ensuring transparency and enabling carbon credit verification.",
    color: "from-green-400 to-emerald-500",
  },
  {
    number: "06",
    icon: Zap,
    title: "Impact Optimization",
    description: "Continuous learning improves efficiency and environmental outcomes",
    details: "AI algorithms constantly evolve, learning from new data to enhance performance and sustainability.",
    color: "from-amber-400 to-yellow-500",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-white">How Our</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-amber-500 bg-clip-text text-transparent">
              AI System Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            From detection to processing, our intelligent platform handles every aspect of waste management with
            precision and efficiency.
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center gap-6">
                  <div className={`text-6xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.number}
                  </div>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}
                  >
                    <step.icon className="w-8 h-8 text-black" />
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-white mb-6">{step.title}</h3>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">{step.description}</p>
                  <p className="text-gray-400 leading-relaxed">{step.details}</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                    />
                  </div>
                  <span className="text-sm text-gray-400 font-medium">Step {step.number}</span>
                </div>
              </div>

              {/* Visual */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <div className="relative h-96 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden">
                  {/* Glassmorphic overlay */}
                  <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10" />

                  {/* Icon visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl animate-pulse`}
                    >
                      <step.icon className="w-16 h-16 text-black" />
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 w-4 h-4 bg-green-400 rounded-full animate-ping" />
                  <div className="absolute bottom-8 left-8 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color.replace("to-", "to-transparent from-")} opacity-20 blur-xl`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
