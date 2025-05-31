"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
  Brain,
  Zap,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Printer,
  Filter,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Settings,
  User,
  RotateCcw,
  Database,
  Cpu,
  Camera,
  MessageSquare,
  Send,
  Eye,
  EyeOff,
} from "lucide-react"

// Mock Data
const mockKPIData = {
  totalWaste: 15847,
  recycled: 11235,
  co2Offset: 2.8,
  aiAccuracy: 94.7,
  energySaved: 1247,
}

const mockWasteOverTime = [
  { date: "Jan", organic: 400, plastic: 240, paper: 300, metal: 100, glass: 150 },
  { date: "Feb", organic: 450, plastic: 280, paper: 320, metal: 120, glass: 180 },
  { date: "Mar", organic: 520, plastic: 300, paper: 380, metal: 140, glass: 200 },
  { date: "Apr", organic: 480, plastic: 320, paper: 350, metal: 160, glass: 220 },
  { date: "May", organic: 600, plastic: 380, paper: 420, metal: 180, glass: 250 },
  { date: "Jun", organic: 650, plastic: 400, paper: 450, metal: 200, glass: 280 },
]

const mockWasteDistribution = [
  { name: "Organic", value: 45, color: "#22c55e" },
  { name: "Plastic", value: 25, color: "#3b82f6" },
  { name: "Paper", value: 20, color: "#f59e0b" },
  { name: "Metal", value: 6, color: "#8b5cf6" },
  { name: "Glass", value: 4, color: "#ef4444" },
]

const mockDailyCollection = [
  { day: "Mon", organic: 120, plastic: 80, paper: 60, metal: 20, glass: 15 },
  { day: "Tue", organic: 140, plastic: 90, paper: 70, metal: 25, glass: 20 },
  { day: "Wed", organic: 160, plastic: 100, paper: 80, metal: 30, glass: 25 },
  { day: "Thu", organic: 180, plastic: 110, paper: 90, metal: 35, glass: 30 },
  { day: "Fri", organic: 200, plastic: 120, paper: 100, metal: 40, glass: 35 },
  { day: "Sat", organic: 220, plastic: 130, paper: 110, metal: 45, glass: 40 },
  { day: "Sun", organic: 180, plastic: 100, paper: 80, metal: 30, glass: 25 },
]

const mockAIPerformance = [
  { category: "Organic", accuracy: 96, color: "#22c55e" },
  { category: "Plastic", accuracy: 94, color: "#3b82f6" },
  { category: "Paper", accuracy: 92, color: "#f59e0b" },
  { category: "Metal", accuracy: 98, color: "#8b5cf6" },
  { category: "Glass", accuracy: 90, color: "#ef4444" },
]

const mockLogs = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  time: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleTimeString(),
  type: ["Organic", "Plastic", "Paper", "Metal", "Glass"][Math.floor(Math.random() * 5)],
  quantity: Math.floor(Math.random() * 50) + 10,
  status: ["Processed", "Failed", "Pending"][Math.floor(Math.random() * 3)],
  confidence: Math.floor(Math.random() * 20) + 80,
  location: ["Zone A", "Zone B", "Zone C", "Zone D"][Math.floor(Math.random() * 4)],
}))

const mockAISuggestions = [
  {
    id: 1,
    title: "Optimize Collection Routes",
    description: "AI suggests reducing collection frequency in Zone A by 15% to save fuel costs.",
    confidence: 92,
    impact: "High",
    category: "Efficiency",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Increase Recycling Awareness",
    description: "Plastic contamination detected. Recommend educational campaign in residential areas.",
    confidence: 88,
    impact: "Medium",
    category: "Education",
    icon: Recycle,
  },
  {
    id: 3,
    title: "Predictive Maintenance",
    description: "Sorting mechanism shows 12% efficiency drop. Schedule maintenance within 3 days.",
    confidence: 95,
    impact: "High",
    category: "Maintenance",
    icon: Settings,
  },
  {
    id: 4,
    title: "Energy Optimization",
    description: "Switch to eco-mode during low-traffic hours to reduce energy consumption by 23%.",
    confidence: 90,
    impact: "Medium",
    category: "Energy",
    icon: Zap,
  },
]

const mockChatHistory = [
  { id: 1, type: "user", message: "What's the current recycling rate?", time: "10:30 AM" },
  {
    id: 2,
    type: "bot",
    message: "Current recycling rate is 71.2%. This is 5.3% higher than last month!",
    time: "10:30 AM",
  },
  { id: 3, type: "user", message: "Which zone needs attention?", time: "10:32 AM" },
  {
    id: 4,
    type: "bot",
    message: "Zone C shows 18% contamination rate. I recommend increasing sorting accuracy there.",
    time: "10:32 AM",
  },
]

const mockAnalyticsData = [
  { month: "Jan", organic: 2400, plastic: 1400, paper: 1800, metal: 600, glass: 900 },
  { month: "Feb", organic: 2600, plastic: 1600, paper: 2000, metal: 700, glass: 1000 },
  { month: "Mar", organic: 2800, plastic: 1800, paper: 2200, metal: 800, glass: 1100 },
  { month: "Apr", organic: 3000, plastic: 2000, paper: 2400, metal: 900, glass: 1200 },
  { month: "May", organic: 3200, plastic: 2200, paper: 2600, metal: 1000, glass: 1300 },
  { month: "Jun", organic: 3400, plastic: 2400, paper: 2800, metal: 1100, glass: 1400 },
]

const mockHeatmapData = [
  { zone: "Zone A", hour: "00:00", value: 20 },
  { zone: "Zone A", hour: "06:00", value: 45 },
  { zone: "Zone A", hour: "12:00", value: 80 },
  { zone: "Zone A", hour: "18:00", value: 95 },
  { zone: "Zone B", hour: "00:00", value: 15 },
  { zone: "Zone B", hour: "06:00", value: 35 },
  { zone: "Zone B", hour: "12:00", value: 70 },
  { zone: "Zone B", hour: "18:00", value: 85 },
]

export function AdvancedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage] = useState(10)
  const [logFilter, setLogFilter] = useState({ type: "all", status: "all", date: "" })
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState(mockChatHistory)
  const [aiModules, setAiModules] = useState({
    aiSort: true,
    alerts: true,
    emergencyLock: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [animatedCounters, setAnimatedCounters] = useState({
    totalWaste: 0,
    recycled: 0,
    co2Offset: 0,
    aiAccuracy: 0,
    energySaved: 0,
  })

  // Animated counter effect
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const intervals = Object.keys(mockKPIData).map((key) => {
      const target = mockKPIData[key as keyof typeof mockKPIData]
      const increment = target / steps

      return setInterval(() => {
        setAnimatedCounters((prev) => ({
          ...prev,
          [key]: Math.min(prev[key as keyof typeof prev] + increment, target),
        }))
      }, stepDuration)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  // Filter logs
  const filteredLogs = mockLogs.filter((log) => {
    const typeMatch = logFilter.type === "all" || log.type === logFilter.type
    const statusMatch = logFilter.status === "all" || log.status === logFilter.status
    const dateMatch = !logFilter.date || log.date.includes(logFilter.date)
    return typeMatch && statusMatch && dateMatch
  })

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return

    const newUserMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: chatMessage,
      time: new Date().toLocaleTimeString(),
    }

    const botResponses = [
      "Based on current data, I recommend optimizing collection routes in Zone C.",
      "The AI accuracy has improved by 3.2% this week. Great progress!",
      "I've detected unusual patterns in plastic waste. Investigating further...",
      "Energy consumption is 15% below average today. Excellent efficiency!",
      "Recycling rate target achieved! Consider setting a higher goal.",
    ]

    const newBotMessage = {
      id: chatHistory.length + 2,
      type: "bot" as const,
      message: botResponses[Math.floor(Math.random() * botResponses.length)],
      time: new Date().toLocaleTimeString(),
    }

    setChatHistory([...chatHistory, newUserMessage, newBotMessage])
    setChatMessage("")
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const chartConfig = {
    organic: { label: "Organic", color: "#22c55e" },
    plastic: { label: "Plastic", color: "#3b82f6" },
    paper: { label: "Paper", color: "#f59e0b" },
    metal: { label: "Metal", color: "#8b5cf6" },
    glass: { label: "Glass", color: "#ef4444" },
  } satisfies ChartConfig

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Smart Waste Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Advanced AI-Powered Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              System Online
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai-suggestions" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Suggestions
            </TabsTrigger>
            <TabsTrigger value="controls" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Controls
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Total Waste",
                  value: animatedCounters.totalWaste.toFixed(0),
                  unit: "kg",
                  icon: Trash2,
                  color: "text-blue-600",
                  bgColor: "bg-blue-50 dark:bg-blue-950/20",
                  trend: "+12.5%",
                  trendUp: true,
                },
                {
                  title: "Recycled",
                  value: animatedCounters.recycled.toFixed(0),
                  unit: "kg",
                  icon: Recycle,
                  color: "text-green-600",
                  bgColor: "bg-green-50 dark:bg-green-950/20",
                  trend: "+8.3%",
                  trendUp: true,
                },
                {
                  title: "CO₂ Offset",
                  value: animatedCounters.co2Offset.toFixed(1),
                  unit: "tons",
                  icon: Leaf,
                  color: "text-emerald-600",
                  bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
                  trend: "+15.2%",
                  trendUp: true,
                },
                {
                  title: "AI Accuracy",
                  value: animatedCounters.aiAccuracy.toFixed(1),
                  unit: "%",
                  icon: Brain,
                  color: "text-purple-600",
                  bgColor: "bg-purple-50 dark:bg-purple-950/20",
                  trend: "+2.1%",
                  trendUp: true,
                },
                {
                  title: "Energy Saved",
                  value: animatedCounters.energySaved.toFixed(0),
                  unit: "kWh",
                  icon: Zap,
                  color: "text-yellow-600",
                  bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
                  trend: "-3.4%",
                  trendUp: false,
                },
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{kpi.title}</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {kpi.value}
                              <span className="text-sm font-normal text-slate-500 ml-1">{kpi.unit}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            {kpi.trendUp ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-xs font-medium ${kpi.trendUp ? "text-green-600" : "text-red-600"}`}>
                              {kpi.trend}
                            </span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                          <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Waste Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Waste Collection Trends</CardTitle>
                  <CardDescription>Monthly waste collection by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockWasteOverTime}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="organic" stroke="#22c55e" strokeWidth={2} />
                          <Line type="monotone" dataKey="plastic" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="paper" stroke="#f59e0b" strokeWidth={2} />
                          <Line type="monotone" dataKey="metal" stroke="#8b5cf6" strokeWidth={2} />
                          <Line type="monotone" dataKey="glass" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Waste Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Waste Distribution</CardTitle>
                  <CardDescription>Current waste composition breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockWasteDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockWasteDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Collection */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Collection</CardTitle>
                  <CardDescription>Weekly collection patterns by waste type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockDailyCollection}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="organic" stackId="a" fill="#22c55e" />
                          <Bar dataKey="plastic" stackId="a" fill="#3b82f6" />
                          <Bar dataKey="paper" stackId="a" fill="#f59e0b" />
                          <Bar dataKey="metal" stackId="a" fill="#8b5cf6" />
                          <Bar dataKey="glass" stackId="a" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* AI Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Performance</CardTitle>
                  <CardDescription>Classification accuracy by waste category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAIPerformance.map((item, index) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{item.accuracy}%</span>
                        </div>
                        <Progress value={item.accuracy} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <CardTitle>Segregation Logs</CardTitle>
                    <CardDescription>Complete history of waste processing activities</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Label>Filters:</Label>
                  </div>
                  <Select value={logFilter.type} onValueChange={(value) => setLogFilter({ ...logFilter, type: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Waste Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Organic">Organic</SelectItem>
                      <SelectItem value="Plastic">Plastic</SelectItem>
                      <SelectItem value="Paper">Paper</SelectItem>
                      <SelectItem value="Metal">Metal</SelectItem>
                      <SelectItem value="Glass">Glass</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={logFilter.status}
                    onValueChange={(value) => setLogFilter({ ...logFilter, status: value })}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Processed">Processed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Search by date..."
                    value={logFilter.date}
                    onChange={(e) => setLogFilter({ ...logFilter, date: e.target.value })}
                    className="w-48"
                  />
                </div>

                {/* Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead>Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">#{log.id}</TableCell>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.time}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {log.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.quantity} kg</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.status === "Processed"
                                  ? "default"
                                  : log.status === "Failed"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {log.status === "Processed" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {log.status === "Failed" && <XCircle className="h-3 w-3 mr-1" />}
                              {log.status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.confidence}%</TableCell>
                          <TableCell>{log.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Showing {indexOfFirstLog + 1} to {Math.min(indexOfLastLog, filteredLogs.length)} of{" "}
                    {filteredLogs.length} entries
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Best Collection Day</p>
                    <p className="text-2xl font-bold text-green-600">Friday</p>
                    <p className="text-xs text-slate-500">847 kg collected</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Daily Average</p>
                    <p className="text-2xl font-bold text-blue-600">623 kg</p>
                    <p className="text-xs text-slate-500">+12% vs last month</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Top Category</p>
                    <p className="text-2xl font-bold text-emerald-600">Organic</p>
                    <p className="text-xs text-slate-500">45% of total waste</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Comparison</CardTitle>
                  <CardDescription>6-month trend analysis by waste category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockAnalyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="organic"
                            stackId="1"
                            stroke="#22c55e"
                            fill="#22c55e"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="plastic"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="paper"
                            stackId="1"
                            stroke="#f59e0b"
                            fill="#f59e0b"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collection Zones Heatmap</CardTitle>
                  <CardDescription>Activity intensity by zone and time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {mockHeatmapData.map((item, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg flex items-center justify-center text-xs font-medium text-white"
                        style={{
                          backgroundColor: `rgba(34, 197, 94, ${item.value / 100})`,
                        }}
                      >
                        {item.value}%
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Zone A-D</span>
                    <span>00:00 - 18:00</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Suggestions Tab */}
          <TabsContent value="ai-suggestions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Suggestions Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI-Generated Recommendations</h3>
                {mockAISuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                            <suggestion.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{suggestion.title}</h4>
                              <Badge
                                variant={suggestion.impact === "High" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {suggestion.impact}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{suggestion.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Confidence:</span>
                                <Progress value={suggestion.confidence} className="w-20 h-2" />
                                <span className="text-xs font-medium">{suggestion.confidence}%</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {suggestion.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* AI Chatbot */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI Assistant</h3>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat with AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 overflow-y-auto space-y-3 mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      {chatHistory.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.type === "user" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700 border"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask AI about waste management..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                      />
                      <Button onClick={handleChatSubmit} size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Controls Tab */}
          <TabsContent value="controls" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>System Controls</CardTitle>
                  <CardDescription>Manage AI modules and system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ai-sort">AI Sorting</Label>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Enable automatic waste classification
                        </p>
                      </div>
                      <Switch
                        id="ai-sort"
                        checked={aiModules.aiSort}
                        onCheckedChange={(checked) => setAiModules({ ...aiModules, aiSort: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="alerts">Smart Alerts</Label>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Receive intelligent notifications</p>
                      </div>
                      <Switch
                        id="alerts"
                        checked={aiModules.alerts}
                        onCheckedChange={(checked) => setAiModules({ ...aiModules, alerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emergency-lock">Emergency Lock</Label>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Lock system in emergency</p>
                      </div>
                      <Switch
                        id="emergency-lock"
                        checked={aiModules.emergencyLock}
                        onCheckedChange={(checked) => setAiModules({ ...aiModules, emergencyLock: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reboot System
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm System Reboot</DialogTitle>
                          <DialogDescription>
                            This will restart all AI modules and may cause temporary service interruption.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm Reboot</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <Database className="h-4 w-4 mr-2" />
                          Reset Database
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Database Reset</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. All historical data will be permanently deleted.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive">Confirm Reset</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="w-full">
                      <Cpu className="h-4 w-4 mr-2" />
                      Update Firmware
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Manual Log Entry & Image Upload */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Log Entry</CardTitle>
                    <CardDescription>Add waste entry manually</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="waste-type">Waste Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="organic">Organic</SelectItem>
                            <SelectItem value="plastic">Plastic</SelectItem>
                            <SelectItem value="paper">Paper</SelectItem>
                            <SelectItem value="metal">Metal</SelectItem>
                            <SelectItem value="glass">Glass</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity (kg)</Label>
                        <Input id="quantity" type="number" placeholder="0.0" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zone-a">Zone A</SelectItem>
                          <SelectItem value="zone-b">Zone B</SelectItem>
                          <SelectItem value="zone-c">Zone C</SelectItem>
                          <SelectItem value="zone-d">Zone D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Add Entry</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Image Classification</CardTitle>
                    <CardDescription>Upload image for AI analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Uploaded"
                            className="max-h-32 mx-auto rounded-lg"
                          />
                          <div className="space-y-2">
                            <p className="font-medium text-green-600">Classification: Plastic Bottle</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Confidence: 96.7%</p>
                            <Progress value={96.7} className="w-full" />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Camera className="h-8 w-8 mx-auto text-slate-400" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Drop image here or click to upload
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    {uploadedImage && (
                      <Button variant="outline" className="w-full" onClick={() => setUploadedImage(null)}>
                        Clear Image
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Profile */}
              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      JD
                    </div>
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">System Administrator</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">john.doe@company.com</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="w-full">Update Password</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Settings & Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your dashboard experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Toggle dark theme</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notifications</Label>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Receive system alerts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Sound Effects</Label>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Enable audio feedback</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Unit System</Label>
                      <Select defaultValue="metric">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metric">Metric (kg, °C)</SelectItem>
                          <SelectItem value="imperial">Imperial (lbs, °F)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Theme Color</Label>
                      <Select defaultValue="green">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
