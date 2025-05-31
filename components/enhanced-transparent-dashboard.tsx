"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
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
  BarChart,
  Bar,
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
  Lightbulb,
  Camera,
  FileText,
  Wrench,
  Building,
  Sparkles,
  Trophy,
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

const monthlyWasteData = [
  { month: "Jan", processed: 15420, recycled: 12336, landfill: 3084 },
  { month: "Feb", processed: 18750, recycled: 15000, landfill: 3750 },
  { month: "Mar", processed: 22100, recycled: 17680, landfill: 4420 },
  { month: "Apr", processed: 19800, recycled: 15840, landfill: 3960 },
  { month: "May", processed: 25600, recycled: 20480, landfill: 5120 },
  { month: "Jun", processed: 28900, recycled: 23120, landfill: 5780 },
]

const ecoScoreData = [
  { category: "Recycling Rate", score: 87, target: 90 },
  { category: "Contamination", score: 92, target: 95 },
  { category: "Energy Efficiency", score: 78, target: 85 },
  { category: "Carbon Footprint", score: 85, target: 90 },
  { category: "Waste Reduction", score: 73, target: 80 },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export function EnhancedTransparentDashboard() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([2, 5, 8])
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest * 100)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

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

  const tips = [
    "Ensure good lighting when taking photos of waste items",
    "Place items on a clean, contrasting background",
    "Capture the entire item within the frame",
    "Avoid shadows and reflections for better accuracy",
    "Take photos from multiple angles for complex items",
    "Clean items before photographing for clearer identification",
  ]

  const achievements = [
    {
      title: "Eco Champion",
      description: "Processed 1000+ waste items",
      icon: Trophy,
      progress: 85,
      color: "from-amber-400 to-yellow-500",
      unlocked: true,
    },
    {
      title: "Carbon Saver",
      description: "Saved 500kg CO₂ equivalent",
      icon: Leaf,
      progress: 92,
      color: "from-emerald-400 to-green-500",
      unlocked: true,
    },
    {
      title: "Accuracy Master",
      description: "Achieved 95% classification accuracy",
      icon: Target,
      progress: 78,
      color: "from-cyan-400 to-teal-500",
      unlocked: false,
    },
  ]

  const quickActions = [
    {
      title: "Upload Waste Image",
      description: "Classify new waste items",
      icon: Upload,
      color: "from-violet-500 to-purple-600",
      action: () => console.log("Upload action"),
    },
    {
      title: "Generate Report",
      description: "Download analytics report",
      icon: FileText,
      color: "from-emerald-500 to-green-600",
      action: () => console.log("Generate report"),
    },
    {
      title: "System Settings",
      description: "Configure preferences",
      icon: Settings,
      color: "from-orange-500 to-amber-600",
      action: () => console.log("Settings"),
    },
    {
      title: "Schedule Maintenance",
      description: "Plan system maintenance",
      icon: Wrench,
      color: "from-rose-500 to-pink-600",
      action: () => console.log("Maintenance"),
    },
  ]

  const globalStats = [
    {
      label: "Active Users",
      value: "12,847",
      icon: Users,
      change: "+23%",
      color: "from-cyan-400 to-teal-600",
    },
    {
      label: "Cities Served",
      value: "156",
      icon: Building,
      change: "+8%",
      color: "from-emerald-400 to-green-600",
    },
    {
      label: "CO₂ Saved (tons)",
      value: "2,847",
      icon: Globe,
      change: "+31%",
      color: "from-violet-400 to-purple-600",
    },
  ]

  return (
    <TooltipProvider>
      <div className="relative bg-transparent" style={{ minHeight: "8000px" }}>
        <ScrollProgressBar />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-16 space-y-16"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
          >
            <div></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                <label htmlFor="auto-refresh" className="text-sm font-medium text-white">
                  Auto Refresh
                </label>
              </div>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
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
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/70">{kpi.title}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <p className="text-3xl font-bold text-white">
                            {kpi.value}
                            <span className="text-sm font-normal text-white/60 ml-1">{kpi.unit}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {kpi.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}
                          >
                            {kpi.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-${kpi.color}-500/20`}>
                        <kpi.icon className={`h-6 w-6 text-${kpi.color}-400`} />
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
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <LineChartIcon className="h-5 w-5" />
                  Waste Processing Trends
                </CardTitle>
                <CardDescription className="text-white/70">Monthly waste processing by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={wasteProcessingData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="month" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
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
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <PieChartIcon className="h-5 w-5" />
                  Waste Distribution
                </CardTitle>
                <CardDescription className="text-white/70">Current waste composition breakdown</CardDescription>
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
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Leaf className="h-5 w-5" />
                Carbon Credit Tracker
              </CardTitle>
              <CardDescription className="text-white/70">Daily carbon credits earned and CO₂ saved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={carbonCreditData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="day" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
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
                  <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-400">456</h3>
                    <p className="text-sm text-green-300">Total Credits This Week</p>
                  </div>
                  <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-400">1.2 tons</h3>
                    <p className="text-sm text-blue-300">CO₂ Saved This Week</p>
                  </div>
                  <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-400">92</h3>
                    <p className="text-sm text-purple-300">Eco Score</p>
                    <Progress value={92} className="mt-2 h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="h-5 w-5" />
                  System Health
                </CardTitle>
                <CardDescription className="text-white/70">Real-time system performance metrics</CardDescription>
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
                        <span className="font-medium text-white">{metric.metric}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={metric.value} className="w-24 h-2" />
                        <span className="text-sm font-medium w-12 text-white">{metric.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5" />
                  Performance Radar
                </CardTitle>
                <CardDescription className="text-white/70">Multi-dimensional performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#ffffff20" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#ffffff80", fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#ffffff60", fontSize: 10 }} />
                      <Radar name="Current" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                      <Radar name="Target" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Waste Processing Bar Chart */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5" />
                Monthly Waste Processing
              </CardTitle>
              <CardDescription className="text-white/70">Processed vs Recycled vs Landfill waste</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyWasteData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#ffffff60" />
                    <YAxis stroke="#ffffff60" />
                    <ChartTooltip />
                    <Legend />
                    <Bar dataKey="processed" fill="#3b82f6" name="Total Processed" />
                    <Bar dataKey="recycled" fill="#22c55e" name="Recycled" />
                    <Bar dataKey="landfill" fill="#ef4444" name="Landfill" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Eco Score Dashboard */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5" />
                Eco Score Dashboard
              </CardTitle>
              <CardDescription className="text-white/70">Environmental performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {ecoScoreData.map((item, index) => (
                  <div key={item.category} className="text-center">
                    <h3 className="text-sm font-medium text-white/70 mb-2">{item.category}</h3>
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#ffffff20"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2"
                          strokeDasharray={`${item.score}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{item.score}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/60">Target: {item.target}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Feedback Section */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5" />
                User Feedback & Testimonials
              </CardTitle>
              <CardDescription className="text-white/70">What our users are saying about the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Rating System */}
                <div className="flex items-center justify-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm font-medium text-white">Rate your experience:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Tooltip key={rating}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setSelectedRating(rating)}
                            className={`p-2 rounded-full transition-colors ${
                              selectedRating === rating
                                ? "bg-blue-500/20 border border-blue-500/50"
                                : "hover:bg-white/10"
                            }`}
                          >
                            {getRatingEmoji(rating)}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {rating} star{rating !== 1 ? "s" : ""}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                  {selectedRating && (
                    <Badge variant="outline" className="ml-2 border-white/20 text-white">
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
                      <Card className="h-full bg-white/5 border border-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-white/10 text-white">
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                <div className="flex">
                                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-white/70 mb-2">
                                {testimonial.role} at {testimonial.company}
                              </p>
                              <p className="text-sm text-white/90 mb-2">{testimonial.comment}</p>
                              <p className="text-xs text-white/60">{testimonial.date}</p>
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
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5" />
                Task Manager
              </CardTitle>
              <CardDescription className="text-white/70">Track and manage your daily tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      completedTasks.includes(task.id)
                        ? "bg-green-500/20 border-green-500/30"
                        : "hover:bg-white/5 border-white/10"
                    }`}
                  >
                    <Checkbox checked={completedTasks.includes(task.id)} onCheckedChange={() => toggleTask(task.id)} />
                    <div className="flex-1">
                      <p
                        className={`font-medium text-white ${
                          completedTasks.includes(task.id) ? "line-through text-white/60" : ""
                        }`}
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
                        <span className="text-xs text-white/60 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
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
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="h-5 w-5" />
                News & Updates
              </CardTitle>
              <CardDescription className="text-white/70">Latest system updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
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
                        <h4 className="font-semibold text-white">{update.title}</h4>
                        <Badge variant="outline" className="text-xs border-white/20 text-white">
                          {update.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 mb-2">{update.summary}</p>
                      <p className="text-xs text-white/60">{update.timestamp}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Activity Logs */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                User Activity Logs
              </CardTitle>
              <CardDescription className="text-white/70">
                Recent user activities and system interactions
              </CardDescription>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-white/70">User</TableHead>
                      <TableHead className="text-white/70">Action</TableHead>
                      <TableHead className="text-white/70">Device</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivityLogs.slice(0, 10).map((log) => (
                      <TableRow key={log.id} className="border-white/10">
                        <TableCell className="font-medium text-white">{log.user}</TableCell>
                        <TableCell className="text-white/80">{log.action}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-white/80">
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
                        <TableCell className="text-sm text-white/60">{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
            <Card className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-3xl">
                  <Lightbulb className="h-8 w-8 text-amber-400" />
                  Tips for Best Results
                </CardTitle>
                <CardDescription className="text-white/80 text-xl">
                  Follow these guidelines to improve AI classification accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <CheckCircle className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-white/90 text-lg">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-3xl">
                  <Award className="h-8 w-8 text-amber-400" />
                  Achievements
                </CardTitle>
                <CardDescription className="text-white/80 text-xl">
                  Track your environmental impact milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      variants={itemVariants}
                      whileHover={cardHoverVariants.hover}
                      className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                        achievement.unlocked
                          ? "bg-white/10 border-white/20 hover:bg-white/15"
                          : "bg-white/5 border-white/10 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`p-4 rounded-full bg-gradient-to-r ${achievement.color} ${
                            achievement.unlocked ? "shadow-2xl" : "grayscale"
                          }`}
                        >
                          <achievement.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-xl">{achievement.title}</h3>
                          <p className="text-white/70 text-lg">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Progress</span>
                          <span className="text-white font-semibold text-lg">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-4 bg-white/20" />
                      </div>
                      {achievement.unlocked && (
                        <div className="absolute top-4 right-4">
                          <Star className="h-8 w-8 text-amber-400 fill-current drop-shadow-lg" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-3xl">
                  <Camera className="h-8 w-8 text-cyan-400" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-white/80 text-xl">Frequently used dashboard functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {quickActions.map((action, index) => (
                    <motion.div key={action.title} variants={itemVariants} whileHover={cardHoverVariants.hover}>
                      <Button
                        onClick={action.action}
                        className="w-full h-auto p-8 bg-white/5 hover:bg-white/15 border border-white/20 rounded-2xl transition-all duration-500 group shadow-2xl"
                        variant="ghost"
                      >
                        <div className="flex flex-col items-center gap-6 text-center">
                          <div
                            className={`p-6 rounded-full bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform shadow-2xl`}
                          >
                            <action.icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white text-xl">{action.title}</div>
                            <div className="text-white/70 mt-2 text-lg">{action.description}</div>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Global Impact */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
              <CardHeader className="text-center">
                <CardTitle className="text-5xl font-bold text-white flex items-center justify-center gap-4">
                  <Sparkles className="h-10 w-10 text-amber-400" />
                  Global Impact
                </CardTitle>
                <CardDescription className="text-white/80 text-2xl">
                  Our collective environmental contribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-10">
                  {globalStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      whileHover={cardHoverVariants.hover}
                      className="text-center p-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                    >
                      <div className={`inline-flex p-6 rounded-full bg-gradient-to-r ${stat.color} mb-8 shadow-2xl`}>
                        <stat.icon className="h-12 w-12 text-white" />
                      </div>
                      <div className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">{stat.value}</div>
                      <div className="text-2xl text-white/90 mb-4">{stat.label}</div>
                      <div className="flex items-center justify-center gap-3">
                        <TrendingUp className="h-6 w-6 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold text-xl">{stat.change}</span>
                        <span className="text-white/70 text-lg">this month</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center py-12">
            <div className="space-y-8">
              <p className="text-white/60 text-xl">
                Powered by AI • Making waste management smarter and more sustainable
              </p>

              {/* Organized Certification Badges */}
              <div className="space-y-4">
                <h3 className="text-white/80 text-lg font-semibold">Certifications & Standards</h3>
                <div className="flex justify-center gap-6 flex-wrap">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
                    Carbon Neutral
                  </Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2">
                    ISO 14001 Certified
                  </Badge>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 px-4 py-2">AI Powered</Badge>
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">Global Impact</Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
