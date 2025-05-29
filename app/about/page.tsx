"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Users, Globe, Award, Github, Linkedin, Mail, Heart, Leaf, Zap, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Environmental scientist with 15+ years in sustainable technology. Former researcher at MIT focusing on AI applications in environmental conservation.",
    avatar: "/placeholder.svg?height=200&width=200&text=SC",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "sarah@smartwaste.ai",
    },
  },
  {
    name: "Alex Rodriguez",
    role: "CTO & Co-founder",
    bio: "Full-stack engineer and AI specialist. Previously led engineering teams at Google and Tesla, with expertise in computer vision and IoT systems.",
    avatar: "/placeholder.svg?height=200&width=200&text=AR",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "alex@smartwaste.ai",
    },
  },
  {
    name: "Dr. Michael Kim",
    role: "Head of AI Research",
    bio: "PhD in Machine Learning from Stanford. Specialized in computer vision and neural networks with 50+ published papers in environmental AI applications.",
    avatar: "/placeholder.svg?height=200&width=200&text=MK",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "michael@smartwaste.ai",
    },
  },
  {
    name: "Emma Thompson",
    role: "Head of Sustainability",
    bio: "Environmental policy expert with experience at UN Environment Programme. Leads our carbon credit initiatives and sustainability partnerships.",
    avatar: "/placeholder.svg?height=200&width=200&text=ET",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "emma@smartwaste.ai",
    },
  },
]

const techStack = [
  {
    category: "Frontend",
    technologies: ["Next.js 14 (React 18)", "TypeScript", "Tailwind CSS", "Framer Motion", "React Three Fiber"],
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Python (FastAPI)", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "AI/ML",
    technologies: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "YOLO v8"],
  },
  {
    category: "Infrastructure",
    technologies: ["AWS/Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    category: "IoT/Hardware",
    technologies: ["Raspberry Pi", "Arduino", "ESP32", "Various Sensors", "Edge Computing"],
  },
  {
    category: "Blockchain",
    technologies: ["Ethereum", "Solidity", "Web3.js", "IPFS", "Smart Contracts"],
  },
]

const sdgGoals = [
  {
    number: 3,
    title: "Good Health and Well-being",
    description: "Reducing pollution and health hazards through proper waste management",
  },
  {
    number: 6,
    title: "Clean Water and Sanitation",
    description: "Preventing water contamination through effective waste segregation",
  },
  {
    number: 11,
    title: "Sustainable Cities",
    description: "Creating cleaner, more sustainable urban environments",
  },
  {
    number: 12,
    title: "Responsible Consumption",
    description: "Promoting circular economy and responsible waste practices",
  },
  {
    number: 13,
    title: "Climate Action",
    description: "Reducing greenhouse gas emissions through improved recycling",
  },
  {
    number: 15,
    title: "Life on Land",
    description: "Protecting ecosystems by reducing landfill waste and pollution",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-spacing bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              About Our Mission
            </Badge>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Transforming Waste Management
              <span className="block text-primary mt-1">Through AI Innovation</span>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground mb-6 leading-relaxed">
              We're on a mission to revolutionize how the world handles waste, using cutting-edge AI, IoT, and
              blockchain technology to create a more sustainable future for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-2xl lg:text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                To democratize intelligent waste management by making AI-powered waste segregation accessible to
                organizations worldwide, ultimately reducing environmental impact and promoting circular economy
                principles.
              </p>
              <div className="space-y-3">
                {[
                  "Achieve 95%+ waste classification accuracy globally",
                  "Reduce landfill waste by 50% in partner organizations",
                  "Enable transparent waste tracking through blockchain",
                  "Create sustainable revenue through carbon credits",
                ].map((goal, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground text-sm">{goal}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="h-16 w-16 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Environmental Impact</h3>
                  <p className="text-muted-foreground px-6 text-sm">
                    Every classification helps build a cleaner, more sustainable world
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="section-spacing bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Why This Project Matters</h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              The global waste crisis demands innovative solutions. Our technology addresses critical environmental
              challenges while creating economic opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Global Waste Crisis",
                stat: "2.01 billion tons",
                description: "Annual global waste generation, expected to grow 70% by 2050",
              },
              {
                icon: Leaf,
                title: "Recycling Gap",
                stat: "Only 20%",
                description: "Of global waste is currently recycled, leaving massive room for improvement",
              },
              {
                icon: Zap,
                title: "Carbon Impact",
                stat: "1.6 billion tons",
                description: "CO₂ equivalent emissions from waste sector annually",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                    <div className="text-xl lg:text-2xl font-bold text-primary mb-2">{item.stat}</div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold">Technology Stack</h2>
            </div>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technologies to ensure scalability, reliability, and performance across all
              components of our waste management ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-4">
                    <h3 className="text-base font-semibold mb-3 text-primary">{category.category}</h3>
                    <div className="space-y-2">
                      {category.technologies.map((tech, idx) => (
                        <div key={idx} className="text-xs bg-muted/50 rounded px-2 py-1">
                          {tech}
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

      {/* Team */}
      <section className="section-spacing bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold">Meet Our Team</h2>
            </div>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              A diverse team of experts in AI, environmental science, and sustainable technology, united by our passion
              for creating positive environmental impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                      <Image
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-base mb-1">{member.name}</h3>
                    <p className="text-primary text-xs mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-3">{member.bio}</p>
                    <div className="flex justify-center gap-1">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href={member.social.linkedin} aria-label="LinkedIn">
                          <Linkedin className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href={member.social.github} aria-label="GitHub">
                          <Github className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href={`mailto:${member.social.email}`} aria-label="Email">
                          <Mail className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Goals */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold">Supporting UN SDGs</h2>
            </div>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform directly contributes to multiple United Nations Sustainable Development Goals, creating
              measurable impact across environmental and social dimensions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {goal.number}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-sm">{goal.title}</h3>
                        <p className="text-xs text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Join Us in Building a Sustainable Future</h2>
            <p className="text-base lg:text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Whether you're an organization looking to improve your waste management or a developer interested in
              contributing to environmental solutions, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="https://github.com" target="_blank">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
