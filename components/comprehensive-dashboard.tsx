"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Trash2,
  Recycle,
  Leaf,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Zap,
  Target,
  CheckCircle,
  Clock,
  Star,
  ThumbsUp,
  Heart,
  Smile,
  Frown,
  Meh,
  Download,
  Upload,
  Settings,
  Bell,
  Calendar,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
  Filter,
  Search,
  MoreVertical,
  ChevronRight,
  Award,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react"

// Mock Data
const wasteProcessingData = [
  { month: "Jan", organic: 2400, plastic: 1398, paper: 980, metal: 390, glass: 480 },
  { month: "Feb", organic: 1398, plastic: 2210, paper: 1200, metal: 490, glass: 380 },
  { month: "Mar", organic: 9800, plastic: 2290, paper: 1400, metal: 590, glass: 680 },
  { month: "Apr", organic: 3908, plastic: 2000, paper: 1600, metal: 690, glass: 580 },
  { month: "May", organic: 4800, plastic: 2181, paper: 1800, metal: 790, glass: 780 },
  { month: "Jun", organic: 3800, plastic: 2500, paper: 2000, metal: 890, glass: 880 },
]

const carbonCreditData = [
  { day: "Mon", credits: 45, co2Saved: 120 },
  { day: "Tue", credits: 52, co2Saved: 140 },
  { day: "Wed", credits: 38, co2Saved: 100 },
  { day: "Thu", credits: 67, co2Saved: 180 },
  { day: "Fri", credits: 71, co2Saved: 190 },
  { day: "Sat", credits: 89, co2Saved: 240 },
  { day: "Sun", credits: 94, co2Saved: 250 },
]

const systemHealthData = [
  { metric: "CPU", value: 45, status: "good" },
  { metric: "Memory", value: 67, status: "warning" },
  { metric: "Storage", value: 23, status: "good" },
  { metric: "Network", value: 89, status: "excellent" },
  { metric: "AI Model", value: 94, status: "excellent" },
  { metric: "Database", value: 78, status: "good" },
]

const userActivityLogs = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  user: ["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Eva Brown"][i % 5],
  action: ["Classified waste", "Updated settings", "Generated report", "Reviewed data", "Optimized system"][i % 5],
  timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
  status: ["success", "pending", "failed"][Math.floor(Math.random() * 3)],
  device: ["Desktop", "Mobile", "Tablet"][Math.floor(Math.random() * 3)],
}))

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Environmental Manager",
    company: "GreenTech Corp",
    avatar: "/placeholder.svg",
    rating: 5,
    comment:
      "This AI waste management system has revolutionized our recycling process. We've seen a 40% increase in proper waste segregation!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Sustainability Director",
    company: "EcoSolutions Ltd",
    avatar: "/placeholder.svg",
    rating: 5,
    comment: "The accuracy of the AI classification is incredible. Our contamination rates have dropped significantly.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Facility Manager",
    company: "Smart Buildings Inc",
    avatar: "/placeholder.svg",
    rating: 4,
    comment: "Easy to use interface and excellent analytics. The carbon credit tracking feature is a game-changer.",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Operations Manager",
    company: "Urban Waste Solutions",
    avatar: "/placeholder.svg",
    rating: 5,
    comment: "Outstanding system! The real-time monitoring and AI suggestions have improved our efficiency by 60%.",
    date: "3 weeks ago",
  },
]

const tasks = [
  { id: 1, title: "Review weekly waste analytics report", completed: false, priority: "high", dueDate: "Today" },
  { id: 2, title: "Update AI model training data", completed: true, priority: "medium", dueDate: "Yesterday" },
  { id: 3, title: "Schedule maintenance for Zone C", completed: false, priority: "low", dueDate: "Tomorrow" },
  { id: 4, title: "Analyze contamination patterns", completed: false, priority: "high", dueDate: "Today" },
  {
    id: 5,
    title: "Generate monthly sustainability report",
    completed: true,
    priority: "medium",
    dueDate: "2 days ago",
  },
  { id: 6, title: "Optimize energy consumption settings", completed: false, priority: "low", dueDate: "Next week" },
  { id: 7, title: "Train new staff on system usage", completed: false, priority: "medium", dueDate: "Friday" },
  { id: 8, title: "Review carbon credit calculations", completed: true, priority: "high", dueDate: "Yesterday" },
]

const newsUpdates = [
  {
    id: 1,
    title: "AI Model Update v2.3 Released",
    summary: "Improved accuracy for plastic classification by 15%",
    category: "System Update",
    timestamp: "2 hours ago",
    priority: "high",
  },
  {
    id: 2,
    title: "New Carbon Credit Partnership",
    summary: "Partnership with GreenCredit Exchange for automated trading",
    category: "Business",
    timestamp: "5 hours ago",
    priority: "medium",
  },
  {
    id: 3,
    title: "Maintenance Scheduled",
    summary: "System maintenance planned for this weekend",
    category: "Maintenance",
    timestamp: "1 day ago",
    priority: "low",
  },
  {
    id: 4,
    title: "Sustainability Milestone Reached",
    summary: "1 million kg of waste processed this month!",
    category: "Achievement",
    timestamp: "2 days ago",
    priority: "high",
  },
  {
    id: 5,
    title: "New Dashboard Features",
    summary: "Enhanced analytics and reporting capabilities added",
    category: "Feature",
    timestamp: "3 days ago",
    priority: "medium",
  },
]

const wasteDistribution = [
  { name: "Organic", value: 45, color: "#22c55e" },
  { name: "Plastic", value: 25, color: "#3b82f6" },
  { name: "Paper", value: 15, color: "#f59e0b" },
  { name: "Metal", value: 8, color: "#8b5cf6" },
  { name: "Glass", value: 7, color: "#ef4444" },
]

const radarData = [
  { subject: "Accuracy", A: 94, B: 87, fullMark: 100 },
  { subject: "Speed", A: 89, B: 92, fullMark: 100 },
  { subject: "Efficiency", A: 91, B: 85, fullMark: 100 },
  { subject: "Reliability", A: 96, B: 89, fullMark: 100 },
  { subject: "Sustainability", A: 88, B: 91, fullMark: 100 },
  { subject: "Innovation", A: 93, B: 86, fullMark: 100 },
]

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="w-2 h-64 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="w-full bg-gradient-to-t from-green-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
      <div className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">{Math.round(scrollProgress)}%</div>
    </div>
  )
}

export function ComprehensiveDashboard() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([2, 5, 8])
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const toggleTask = (taskId: number) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const chartConfig = {
    organic: { label: "Organic", color: "#22c55e" },
    plastic: { label: "Plastic", color: "#3b82f6" },
    paper: { label: "Paper", color: "#f59e0b" },
    metal: { label: "Metal", color: "#8b5cf6" },
    glass: { label: "Glass", color: "#ef4444" },
  } satisfies ChartConfig

  const getRatingEmoji = (rating: number) => {
    switch (rating) {
      case 1:
        return <Frown className="h-6 w-6 text-red-500" />
      case 2:
        return <Meh className="h-6 w-6 text-orange-500" />
      case 3:
        return <Smile className="h-6 w-6 text-yellow-500" />
      case 4:
        return <ThumbsUp className="h-6 w-6 text-blue-500" />
      case 5:
        return <Heart className="h-6 w-6 text-red-500" />
      default:
        return <Star className="h-6 w-6 text-gray-400" />
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative">
        <ScrollProgressBar />

        <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
          >
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Waste Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                AI-Powered Waste Management Analytics & Control Center
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                <label htmlFor="auto-refresh" className="text-sm font-medium">
                  Auto Refresh
                </label>
              </div>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Waste Processed",
                value: "15,847",
                unit: "kg",
                change: "+12.5%",
                trend: "up",
                icon: Trash2,
                color: "blue",
              },
              {
                title: "Recycling Rate",
                value: "87.3",
                unit: "%",
                change: "+5.2%",
                trend: "up",
                icon: Recycle,
                color: "green",
              },
              {
                title: "CO₂ Saved",
                value: "2.8",
                unit: "tons",
                change: "+18.7%",
                trend: "up",
                icon: Leaf,
                color: "emerald",
              },
              {
                title: "AI Accuracy",
                value: "94.7",
                unit: "%",
                change: "+2.1%",
                trend: "up",
                icon: Target,
                color: "purple",
              },
            ].map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{kpi.title}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <p className="text-3xl font-bold">
                            {kpi.value}
                            <span className="text-sm font-normal text-slate-500 ml-1">{kpi.unit}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {kpi.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                          >
                            {kpi.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-${kpi.color}-50 dark:bg-${kpi.color}-950/20`}>
                        <kpi.icon className={`h-6 w-6 text-${kpi.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Waste Processing Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5" />
                  Waste Processing Trends
                </CardTitle>
                <CardDescription>Monthly waste processing by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={wasteProcessingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="organic" stroke="#22c55e" strokeWidth={2} />
                        <Line type="monotone" dataKey="plastic" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="paper" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Waste Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Waste Distribution
                </CardTitle>
                <CardDescription>Current waste composition breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {wasteDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carbon Credits & CO2 Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Carbon Credit Tracker
              </CardTitle>
              <CardDescription>Daily carbon credits earned and CO₂ saved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={carbonCreditData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip />
                        <Area
                          type="monotone"
                          dataKey="credits"
                          stackId="1"
                          stroke="#22c55e"
                          fill="#22c55e"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="co2Saved"
                          stackId="2"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-600">456</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">Total Credits This Week</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600">1.2 tons</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">CO₂ Saved This Week</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <h3 className="text-2xl font-bold text-purple-600">92</h3>
                    <p className="text-sm text-purple-700 dark:text-purple-400">Eco Score</p>
                    <Progress value={92} className="mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Health
                </CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealthData.map((metric, index) => (
                    <div key={metric.metric} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            metric.status === "excellent"
                              ? "bg-green-500"
                              : metric.status === "good"
                                ? "bg-blue-500"
                                : metric.status === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">{metric.metric}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={metric.value} className="w-24" />
                        <span className="text-sm font-medium w-12">{metric.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Radar
                </CardTitle>
                <CardDescription>Multi-dimensional performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Current" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                      <Radar name="Target" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                User Feedback & Testimonials
              </CardTitle>
              <CardDescription>What our users are saying about the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Rating System */}
                <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-sm font-medium">Rate your experience:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`p-2 rounded-full transition-colors ${
                          selectedRating === rating
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {getRatingEmoji(rating)}
                      </button>
                    ))}
                  </div>
                  {selectedRating && (
                    <Badge variant="outline" className="ml-2">
                      {selectedRating}/5 stars
                    </Badge>
                  )}
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: testimonial.id * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{testimonial.name}</h4>
                                <div className="flex">
                                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                {testimonial.role} at {testimonial.company}
                              </p>
                              <p className="text-sm mb-2">{testimonial.comment}</p>
                              <p className="text-xs text-slate-500">{testimonial.date}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Task Manager
              </CardTitle>
              <CardDescription>Track and manage your daily tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      completedTasks.includes(task.id)
                        ? "bg-green-50 dark:bg-green-950/20 border-green-200"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Checkbox checked={completedTasks.includes(task.id)} onCheckedChange={() => toggleTask(task.id)} />
                    <div className="flex-1">
                      <p
                        className={`font-medium ${completedTasks.includes(task.id) ? "line-through text-slate-500" : ""}`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* News & Updates Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                News & Updates
              </CardTitle>
              <CardDescription>Latest system updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        update.priority === "high"
                          ? "bg-red-500"
                          : update.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{update.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {update.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{update.summary}</p>
                      <p className="text-xs text-slate-500">{update.timestamp}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Activity Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Activity Logs
              </CardTitle>
              <CardDescription>Recent user activities and system interactions</CardDescription>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {log.device === "Desktop" && <Monitor className="h-4 w-4" />}
                            {log.device === "Mobile" && <Smartphone className="h-4 w-4" />}
                            {log.device === "Tablet" && <Tablet className="h-4 w-4" />}
                            {log.device}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              log.status === "success"
                                ? "default"
                                : log.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 dark:text-slate-400">{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Eco Champion</p>
                      <p className="text-xs text-slate-600">1M kg processed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Carbon Saver</p>
                      <p className="text-xs text-slate-600">100 tons CO₂ saved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Accuracy Master</p>
                      <p className="text-xs text-slate-600">95%+ accuracy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Waste Image
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-600">2.4M</h3>
                    <p className="text-sm text-slate-600">Total Users Worldwide</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600">847</h3>
                    <p className="text-sm text-slate-600">Cities Using Our System</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-purple-600">15.2K</h3>
                    <p className="text-sm text-slate-600">Tons CO₂ Saved Globally</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
