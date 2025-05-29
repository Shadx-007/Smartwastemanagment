"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Network, Shield, Star, Quote, ChevronLeft, ChevronRight, Camera, BarChart3, Globe } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const features = [
  {
    icon: Brain,
    title: "Advanced AI Recognition",
    description: "Deep learning models trained on millions of waste samples for 99.2% accuracy",
    details: "Our neural networks can identify over 150 different waste types and materials",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Camera,
    title: "Real-time Image Processing",
    description: "Process thousands of images per second with instant classification results",
    details: "Edge computing ensures zero-latency processing for immediate sorting decisions",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Forecast waste patterns and optimize collection routes using machine learning",
    details: "Reduce operational costs by up to 40% with intelligent route optimization",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Shield,
    title: "Blockchain Verification",
    description: "Immutable tracking of waste journey from collection to final processing",
    details: "Complete transparency and carbon credit verification through distributed ledger",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Network,
    title: "IoT Integration",
    description: "Connected sensors monitor bin levels, temperature, and contamination in real-time",
    details: "Smart sensors reduce collection costs and prevent overflow situations",
    color: "from-teal-400 to-green-500",
  },
  {
    icon: Globe,
    title: "Global Impact Tracking",
    description: "Monitor environmental impact across multiple locations and regions",
    details: "Track CO2 reduction, energy savings, and sustainability metrics worldwide",
    color: "from-indigo-400 to-blue-500",
  },
]

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    image: "/placeholder.svg?height=400&width=400&text=SC",
    bio: "PhD in Computer Vision from MIT. 15+ years in AI research with focus on environmental applications.",
    achievements: ["Published 50+ research papers", "Former Google AI researcher", "TEDx speaker on AI sustainability"],
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Engineering",
    image: "/placeholder.svg?height=400&width=400&text=MR",
    bio: "Former Tesla senior engineer specializing in IoT systems and autonomous vehicle technology.",
    achievements: [
      "Led Tesla's sensor integration team",
      "20+ patents in IoT technology",
      "MIT Technology Review 35 Under 35",
    ],
  },
  {
    name: "Dr. Emily Watson",
    role: "Environmental Scientist",
    image: "/placeholder.svg?height=400&width=400&text=EW",
    bio: "Climate research expert with focus on waste management and circular economy solutions.",
    achievements: ["UN Climate Change advisor", "Author of 'Circular Cities'", "Environmental Innovation Award 2023"],
  },
  {
    name: "David Kim",
    role: "Blockchain Architect",
    image: "/placeholder.svg?height=400&width=400&text=DK",
    bio: "Distributed systems expert with extensive experience in blockchain and security protocols.",
    achievements: ["Former Ethereum core developer", "Blockchain security consultant", "DeFi protocol architect"],
  },
]

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Sustainability Director",
    company: "EcoTech Solutions",
    content:
      "Smart Waste has revolutionized our waste management process. We've achieved 95% recycling rate and reduced costs by 35%.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100&text=JM",
  },
  {
    name: "Robert Chen",
    role: "Operations Manager",
    company: "GreenCity Municipal",
    content:
      "The AI accuracy is incredible. Our contamination rates dropped from 15% to just 2% within the first month of implementation.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100&text=RC",
  },
  {
    name: "Lisa Thompson",
    role: "Environmental Coordinator",
    company: "Urban Dynamics",
    content:
      "Real-time monitoring and analytics have given us insights we never had before. The ROI was evident within 3 months.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100&text=LT",
  },
  {
    name: "Ahmed Hassan",
    role: "Facility Manager",
    company: "Smart Buildings Inc",
    content:
      "The blockchain tracking feature provides complete transparency. Our stakeholders love the detailed impact reports.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100&text=AH",
  },
]

const partners = [
  { name: "Microsoft", logo: "/placeholder.svg?height=80&width=200&text=Microsoft" },
  { name: "Google Cloud", logo: "/placeholder.svg?height=80&width=200&text=Google" },
  { name: "AWS", logo: "/placeholder.svg?height=80&width=200&text=AWS" },
  { name: "IBM", logo: "/placeholder.svg?height=80&width=200&text=IBM" },
  { name: "NVIDIA", logo: "/placeholder.svg?height=80&width=200&text=NVIDIA" },
  { name: "Tesla", logo: "/placeholder.svg?height=80&width=200&text=Tesla" },
  { name: "Siemens", logo: "/placeholder.svg?height=80&width=200&text=Siemens" },
  { name: "Schneider", logo: "/placeholder.svg?height=80&width=200&text=Schneider" },
]

export function ExtendedContentSections() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="space-y-32">
      {/* Animated How It Works Scroll Sequence */}
      <section className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-300">Experience the complete AI-powered waste management workflow</p>
          </motion.div>

          <div className="space-y-24">
            {[
              { step: 1, title: "Image Capture", desc: "High-resolution cameras capture waste items" },
              { step: 2, title: "AI Analysis", desc: "Neural networks classify materials in milliseconds" },
              { step: 3, title: "Smart Sorting", desc: "Robotic systems sort based on AI recommendations" },
              { step: 4, title: "Impact Tracking", desc: "Blockchain records environmental impact data" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-16 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="text-6xl font-black text-green-400 mb-4">0{item.step}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-xl text-gray-300">{item.desc}</p>
                </div>
                <div className="flex-1">
                  <div className="h-64 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-3xl border border-green-500/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Feature Breakdowns */}
      <section className="py-32 bg-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-white">Advanced</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-green-500/30 transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                    <p className="text-sm text-gray-400">{feature.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Profiles */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-300">World-class experts driving innovation in AI and sustainability</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/30 transition-all duration-500 group">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-1">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={120}
                          height={120}
                          className="rounded-full w-full h-full object-cover bg-gray-800"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-green-400 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                    <div className="space-y-2">
                      {member.achievements.map((achievement, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonial Carousel */}
      <section className="py-32 bg-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-white">What Our</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-800 p-8">
              <CardContent className="text-center">
                <Quote className="w-12 h-12 text-green-400 mx-auto mb-6" />
                <p className="text-2xl text-white mb-8 leading-relaxed">"{testimonials[currentTestimonial].content}"</p>
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={60}
                    height={60}
                    className="rounded-full bg-gray-800"
                  />
                  <div className="text-left">
                    <div className="font-bold text-white">{testimonials[currentTestimonial].name}</div>
                    <div className="text-green-400">{testimonials[currentTestimonial].role}</div>
                    <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-green-400" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logo Showcase */}
      <section className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Trusted Partners
              </span>
            </h2>
            <p className="text-xl text-gray-300">Collaborating with industry leaders to drive innovation</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={150}
                  height={60}
                  className="opacity-60 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
