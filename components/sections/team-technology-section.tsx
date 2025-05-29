"use client"

import { motion } from "framer-motion"
import { Brain, Cpu, Network, Shield, Database, Zap } from "lucide-react"
import Image from "next/image"

const technologies = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description: "Advanced neural networks for waste classification and pattern recognition",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    description: "Continuous learning algorithms that improve accuracy over time",
    color: "from-amber-400 to-yellow-500",
  },
  {
    icon: Network,
    title: "IoT Integration",
    description: "Connected sensors and devices for real-time monitoring and control",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable ledger technology for transparent waste tracking",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Database,
    title: "Big Data Analytics",
    description: "Processing massive datasets to optimize waste management strategies",
    color: "from-green-400 to-lime-500",
  },
  {
    icon: Zap,
    title: "Edge Computing",
    description: "Real-time processing at the source for instant decision making",
    color: "from-amber-400 to-yellow-600",
  },
]

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    image: "/placeholder.svg?height=300&width=300&text=SC",
    bio: "PhD in Computer Vision, 15+ years in AI research",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Engineering",
    image: "/placeholder.svg?height=300&width=300&text=MR",
    bio: "Former Tesla engineer, IoT systems specialist",
  },
  {
    name: "Dr. Emily Watson",
    role: "Environmental Scientist",
    image: "/placeholder.svg?height=300&width=300&text=EW",
    bio: "Climate research expert, sustainability advocate",
  },
  {
    name: "David Kim",
    role: "Blockchain Architect",
    image: "/placeholder.svg?height=300&width=300&text=DK",
    bio: "Distributed systems expert, security specialist",
  },
]

export function TeamTechnologySection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.1),transparent_50%)]" />
      </div>

      <div className="container relative z-10">
        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Cutting-Edge
            </span>
            <br />
            <span className="text-white">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our platform leverages the latest advances in AI, IoT, and blockchain technology to deliver unparalleled
            waste management solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700 hover:border-green-500/30 transition-all duration-500 hover:scale-105">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                />

                <div className="relative z-10 space-y-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tech.icon className="w-8 h-8 text-black" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-white">Meet Our</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-amber-500 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            World-class experts in AI, environmental science, and sustainable technology working together to solve the
            global waste crisis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700 hover:border-green-500/30 transition-all duration-500 hover:scale-105 text-center">
                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-amber-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-amber-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
