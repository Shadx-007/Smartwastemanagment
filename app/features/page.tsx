"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Recycle,
  Cpu,
  Shield,
  BarChart3,
  Zap,
  Camera,
  Wifi,
  Database,
  Cloud,
  Lock,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const coreFeatures = [
  {
    icon: Recycle,
    title: "Smart Waste Classification",
    description:
      "Advanced AI algorithms classify waste into 15+ categories including plastics, metals, organics, electronics, and hazardous materials with 95% accuracy.",
    benefits: [
      "15+ waste categories supported",
      "95% classification accuracy",
      "Real-time processing under 2 seconds",
      "Continuous learning from new data",
    ],
  },
  {
    icon: Cpu,
    title: "IoT-Based Detection",
    description:
      "Network of smart sensors including weight, optical, capacitive, and infrared sensors provide comprehensive material analysis.",
    benefits: [
      "Multi-sensor fusion technology",
      "Real-time contamination detection",
      "Automatic bin capacity monitoring",
      "Predictive maintenance alerts",
    ],
  },
  {
    icon: Shield,
    title: "Blockchain Tracking",
    description:
      "Immutable ledger system tracks waste journey from collection to final processing, ensuring complete transparency and accountability.",
    benefits: [
      "End-to-end waste tracking",
      "Immutable audit trails",
      "Smart contract automation",
      "Carbon credit verification",
    ],
  },
  {
    icon: BarChart3,
    title: "Carbon Credit Calculation",
    description:
      "Automatically calculate and verify carbon credits based on recycling activities, waste reduction, and environmental impact metrics.",
    benefits: [
      "Automated carbon credit calculation",
      "Verified environmental impact metrics",
      "Integration with carbon markets",
      "Real-time sustainability scoring",
    ],
  },
  {
    icon: Zap,
    title: "Smart Analytics Dashboard",
    description:
      "Comprehensive analytics platform providing insights on waste patterns, environmental impact, and optimization recommendations.",
    benefits: [
      "Real-time waste analytics",
      "Predictive trend analysis",
      "Custom reporting tools",
      "Performance optimization insights",
    ],
  },
  {
    icon: Camera,
    title: "Computer Vision System",
    description:
      "State-of-the-art computer vision powered by deep learning models trained on millions of waste images for precise identification.",
    benefits: [
      "Deep learning neural networks",
      "Multi-angle image analysis",
      "Edge computing capabilities",
      "Offline processing support",
    ],
  },
]

const technicalFeatures = [
  {
    icon: Wifi,
    title: "IoT Connectivity",
    description:
      "Seamless integration with existing waste management infrastructure through multiple connectivity options.",
    specs: ["WiFi 6, 4G/5G, LoRaWAN", "Edge computing support", "Offline operation capability", "Real-time data sync"],
  },
  {
    icon: Database,
    title: "Data Management",
    description:
      "Robust data infrastructure handling millions of classification events with enterprise-grade security.",
    specs: ["PostgreSQL + MongoDB", "Real-time data processing", "Automated backups", "GDPR compliance"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable cloud architecture supporting thousands of devices with 99.9% uptime guarantee.",
    specs: ["Auto-scaling infrastructure", "Global CDN deployment", "Multi-region redundancy", "99.9% uptime SLA"],
  },
  {
    icon: Lock,
    title: "Security & Privacy",
    description: "Enterprise-grade security with end-to-end encryption and comprehensive privacy protection.",
    specs: ["AES-256 encryption", "Zero-trust architecture", "SOC 2 Type II certified", "Privacy by design"],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* 3D Shape Placeholder */}
      <div className="absolute top-20 right-10 shape-placeholder hidden lg:flex">
        <Sparkles className="h-8 w-8 text-white/30" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="section-spacing py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
            >
              <Badge variant="secondary" className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
                Complete Feature Overview
              </Badge>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-white leading-tight">
                Revolutionary Waste Management
                <span className="block text-green-400 mt-1">Technology Stack</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                Discover how our comprehensive platform combines AI, IoT, blockchain, and advanced analytics to create
                the world's most intelligent waste segregation system.
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-emerald-600">
                <Link href="/demo">Try Live Demo</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Core Features */}
        <section className="section-spacing py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 lg:mb-20"
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white">Core Platform Features</h2>
              <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto">
                Each feature is designed to work seamlessly together, creating a comprehensive waste management
                ecosystem that drives real environmental impact.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-gray-900/80 border-gray-700 backdrop-blur-xl hover:bg-gray-800/80 transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <feature.icon className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 lg:p-8">
                      <p className="text-gray-300 mb-4 text-sm">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            <span className="text-xs text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="section-spacing py-16 lg:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 lg:mb-20"
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-white">Technical Specifications</h2>
              <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto">
                Built on enterprise-grade infrastructure with cutting-edge technology to ensure reliability,
                scalability, and security.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {technicalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center bg-gray-900/80 border-gray-700 backdrop-blur-xl hover:bg-gray-800/80 transition-all duration-300">
                    <CardContent className="p-6 lg:p-8">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-3">
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-white">{feature.title}</h3>
                      <p className="text-xs text-gray-300 mb-3">{feature.description}</p>
                      <div className="space-y-1">
                        {feature.specs.map((spec, idx) => (
                          <div key={idx} className="text-xs bg-gray-800/50 rounded px-2 py-1 text-gray-300">
                            {spec}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="section-spacing py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                  Seamless Integration with Existing Infrastructure
                </h2>
                <p className="text-base text-gray-300 mb-6">
                  Our platform is designed to integrate effortlessly with your current waste management systems,
                  requiring minimal disruption while maximizing efficiency gains.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "API-first architecture for easy integration",
                    "Support for legacy waste management systems",
                    "Flexible deployment options (cloud, on-premise, hybrid)",
                    "Comprehensive training and support included",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-emerald-600">
                  <Link href="/pricing" className="flex items-center gap-2">
                    Get Started Today
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 flex items-center justify-center backdrop-blur-xl">
                  <div className="text-center">
                    <Globe className="h-16 w-16 text-green-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2 text-white">Global Deployment</h3>
                    <p className="text-gray-300 text-sm">Deployed across 50+ countries with 99.9% uptime</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
