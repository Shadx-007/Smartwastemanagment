"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Recycle,
  Leaf,
  TrendingUp,
  Users,
  Award,
  Wind,
  Thermometer,
  Star,
  Trophy,
  Target,
  Activity,
  BarChart3,
  PieChartIcon,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Filter,
  SortAsc,
  Lightbulb,
  Globe,
  Cpu,
  Database,
  Shield,
  Wifi,
} from "lucide-react"

// Sample data for charts
const wasteData = [
  { month: "Jan", plastic: 120, organic: 80, electronic: 30, total: 230 },
  { month: "Feb", plastic: 140, organic: 95, electronic: 25, total: 260 },
  { month: "Mar", plastic: 110, organic: 110, electronic: 40, total: 260 },
  { month: "Apr", plastic: 130, organic: 85, electronic: 35, total: 250 },
  { month: "May", plastic: 125, organic: 100, electronic: 45, total: 270 },
  { month: "Jun", plastic: 115, organic: 120, electronic: 50, total: 285 },
]

const pieData = [
  { name: "Plastic", value: 35, color: "#3b82f6" },
  { name: "Organic", value: 40, color: "#22c55e" },
  { name: "Electronic", value: 15, color: "#f59e0b" },
  { name: "Other", value: 10, color: "#ef4444" },
]

const radarData = [
  { subject: "Efficiency", A: 120, B: 110, fullMark: 150 },
  { subject: "Accuracy", A: 98, B: 130, fullMark: 150 },
  { subject: "Speed", A: 86, B: 130, fullMark: 150 },
  { subject: "Sustainability", A: 99, B: 100, fullMark: 150 },
  { subject: "Cost", A: 85, B: 90, fullMark: 150 },
  { subject: "Innovation", A: 65, B: 85, fullMark: 150 },
]

const leaderboardData = [
  { rank: 1, name: "EcoWarrior2024", points: 15420, badge: "🏆", level: "Platinum" },
  { rank: 2, name: "GreenGuardian", points: 14850, badge: "🥈", level: "Gold" },
  { rank: 3, name: "RecycleHero", points: 13990, badge: "🥉", level: "Gold" },
  { rank: 4, name: "WasteWizard", points: 12750, badge: "⭐", level: "Silver" },
  { rank: 5, name: "EcoChampion", points: 11200, badge: "⭐", level: "Silver" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Environmental Scientist",
    company: "GreenTech Solutions",
    content:
      "This AI-powered waste management system has revolutionized how we handle recycling in our facility. The accuracy is incredible!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Chen",
    role: "Sustainability Manager",
    company: "EcoCity Corp",
    content:
      "The real-time monitoring and analytics have helped us reduce waste by 40% and increase recycling efficiency dramatically.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    company: "Smart Waste Inc",
    content:
      "Implementation was seamless, and the ROI was visible within the first month. Highly recommend for any organization serious about sustainability.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const processingHistory = [
  { id: "WP001", type: "Plastic Bottle", status: "Processed", time: "2 mins ago", confidence: 98 },
  { id: "WP002", type: "Organic Waste", status: "Processing", time: "5 mins ago", confidence: 95 },
  { id: "WP003", type: "E-Waste", status: "Completed", time: "8 mins ago", confidence: 92 },
  { id: "WP004", type: "Paper", status: "Processed", time: "12 mins ago", confidence: 97 },
  { id: "WP005", type: "Metal Can", status: "Completed", time: "15 mins ago", confidence: 99 },
]

const funFacts = [
  "🌍 One recycled aluminum can saves enough energy to power a TV for 3 hours",
  "♻️ Recycling one ton of paper saves 17 trees and 7,000 gallons of water",
  "🔋 E-waste contains precious metals worth billions of dollars globally",
  "🌱 Composting organic waste reduces methane emissions by up to 50%",
  "🏭 AI-powered sorting increases recycling efficiency by 85%",
]

export function MassiveExpandedDashboard() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [weatherData, setWeatherData] = useState({
    temperature: 22,
    humidity: 65,
    airQuality: "Good",
    windSpeed: 12,
  })

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="min-h-screen pt-32 md:pt-48 p-6 space-y-16 md:space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center space-y-4 mb-16 md:mb-32">
        <h1 className="text-4xl md:text-6xl font-bold heading-gradient">Smart Waste Analytics Dashboard</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Real-time insights, AI-powered analytics, and comprehensive waste management solutions
        </p>
      </motion.div>

      {/* Real-time Overview Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Waste Processed",
            value: "2,847 kg",
            icon: Recycle,
            change: "+12.5%",
            color: "text-blue-500",
          },
          { title: "Recycling Rate", value: "87.3%", icon: Leaf, change: "+5.2%", color: "text-green-500" },
          { title: "Active Users", value: "1,234", icon: Users, change: "+8.1%", color: "text-purple-500" },
          { title: "Carbon Saved", value: "156 tons", icon: Wind, change: "+15.3%", color: "text-orange-500" },
        ].map((stat, index) => (
          <Card key={index} className="glass-card hover:glow-blue transition-all duration-300 card-3d">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Interactive Charts Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Waste Processing Trends
            </CardTitle>
            <CardDescription>Monthly waste processing by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="plastic" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="organic" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="electronic" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Waste Distribution
            </CardTitle>
            <CardDescription>Current waste type breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Analytics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Radar</CardTitle>
            <CardDescription>System performance across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="Target" dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Environmental Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Temperature</span>
              <span className="text-lg font-bold">{weatherData.temperature}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Humidity</span>
              <span className="text-lg font-bold">{weatherData.humidity}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Air Quality</span>
              <Badge variant="secondary">{weatherData.airQuality}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Wind Speed</span>
              <span className="text-lg font-bold">{weatherData.windSpeed} km/h</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Processing History Table */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Processing History
            </CardTitle>
            <CardDescription>Latest waste processing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Search..." className="max-w-sm" />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processingHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "Completed"
                            ? "default"
                            : item.status === "Processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={item.confidence} className="w-16" />
                        <span className="text-sm">{item.confidence}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Feedback Form */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Share Your Feedback
            </CardTitle>
            <CardDescription>Help us improve our waste management system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-name">Name</Label>
              <Input id="feedback-name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback-email">Email</Label>
              <Input id="feedback-email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback-message">Message</Label>
              <Textarea id="feedback-message" placeholder="Share your thoughts..." rows={4} />
            </div>
            <Button className="w-full glass-button">
              <MessageSquare className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Sustainability Quiz
            </CardTitle>
            <CardDescription>Test your environmental knowledge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">How long does it take for a plastic bottle to decompose?</h4>
              <div className="space-y-2">
                {["10 years", "50 years", "450 years", "1000 years"].map((option, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start">
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Question 1 of 5</span>
              <Progress value={20} className="w-24" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Testimonials Carousel */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              What Our Users Say
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonial ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic">"{testimonials[currentTestimonial].content}"</blockquote>
                <div className="flex items-center justify-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{testimonials[currentTestimonial].name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-medium">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Video Demo Section */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              System Demo Video
            </CardTitle>
            <CardDescription>See our AI waste management system in action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    {isVideoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </div>
                  <p className="text-lg font-medium">AI Waste Classification Demo</p>
                  <p className="text-sm text-muted-foreground">Duration: 3:45</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <Button variant="secondary" size="sm" onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                  {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setVideoMuted(!videoMuted)}>
                    {videoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Community Leaderboard
            </CardTitle>
            <CardDescription>Top performers in waste management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{user.badge}</div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">Level: {user.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{user.points.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Your Achievements
            </CardTitle>
            <CardDescription>Unlock badges by reaching sustainability milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "First Sort", icon: "🎯", unlocked: true },
                { name: "Eco Warrior", icon: "🌱", unlocked: true },
                { name: "Recycling Pro", icon: "♻️", unlocked: true },
                { name: "Green Thumb", icon: "🌿", unlocked: false },
                { name: "Planet Saver", icon: "🌍", unlocked: false },
                { name: "Zero Waste", icon: "🏆", unlocked: false },
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-lg border-2 transition-all ${
                    badge.unlocked ? "border-primary bg-primary/10 glow-blue" : "border-muted bg-muted/20 opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="text-sm font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fun Facts */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-lg font-medium"
              >
                {funFacts[currentFactIndex]}
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Health Monitoring */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "API Status", status: "Operational", icon: Wifi, color: "text-green-500" },
          { name: "Database", status: "Healthy", icon: Database, color: "text-green-500" },
          { name: "AI Model", status: "Active", icon: Cpu, color: "text-blue-500" },
          { name: "Security", status: "Secure", icon: Shield, color: "text-green-500" },
        ].map((system, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{system.name}</p>
                  <p className={`text-lg font-bold ${system.color}`}>{system.status}</p>
                </div>
                <system.icon className={`h-6 w-6 ${system.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Global Impact Metrics */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Global Impact
            </CardTitle>
            <CardDescription>Our collective environmental impact worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-green-500">2.4M</p>
                <p className="text-sm text-muted-foreground">Tons of Waste Processed</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-blue-500">156K</p>
                <p className="text-sm text-muted-foreground">Trees Saved</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-purple-500">89%</p>
                <p className="text-sm text-muted-foreground">Recycling Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Waste Management?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of organizations already using our AI-powered waste management system to create a more
              sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glass-button">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="glass-button">
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
