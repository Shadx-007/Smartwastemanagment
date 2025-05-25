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
} from "lucide-react"
import Link from "next/link"
import { MainLayout } from "@/components/main-layout"

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
    <MainLayout showSidebars={false} hasFooter={false}>
      <div className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-6">
                Complete Feature Overview
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Revolutionary Waste Management
                <span className="block text-primary">Technology Stack</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover how our comprehensive platform combines AI, IoT, blockchain, and advanced analytics to create
                the world's most intelligent waste segregation system.
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Link href="/demo">Try Live Demo</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Platform Features</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Each feature is designed to work seamlessly together, creating a comprehensive waste management
                ecosystem that drives real environmental impact.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
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
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specifications</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built on enterprise-grade infrastructure with cutting-edge technology to ensure reliability,
                scalability, and security.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.specs.map((spec, idx) => (
                          <div key={idx} className="text-xs bg-muted/50 rounded px-2 py-1">
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
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Seamless Integration with Existing Infrastructure
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform is designed to integrate effortlessly with your current waste management systems,
                  requiring minimal disruption while maximizing efficiency gains.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "API-first architecture for easy integration",
                    "Support for legacy waste management systems",
                    "Flexible deployment options (cloud, on-premise, hybrid)",
                    "Comprehensive training and support included",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" asChild>
                  <Link href="/pricing" className="flex items-center gap-2">
                    Get Started Today
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-24 w-24 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Global Deployment</h3>
                    <p className="text-muted-foreground">Deployed across 50+ countries with 99.9% uptime</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
