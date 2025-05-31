"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import type { ChartConfig } from "@/components/ui/chart"
import { ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import {
  Trash2,
  Recycle,
  Leaf,
  Brain,
  Zap,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Camera,
  Bell,
  CheckCircle,
  Target,
  Battery,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckSquare,
} from "lucide-react"
import { Enhanced3DBackground } from "./enhanced-3d-background"

// Extensive Mock Data
const extendedKPIData = [
  { title: "Total Waste Processed", value: 15847, unit: "kg", icon: Trash2, color: "blue", trend: "+12.5%", up: true },
  { title: "Recycled Materials", value: 11235, unit: "kg", icon: Recycle, color: "green", trend: "+8.3%", up: true },
  { title: "CO₂ Offset", value: 2.8, unit: "tons", icon: Leaf, color: "emerald", trend: "+15.2%", up: true },
  { title: "AI Accuracy", value: 94.7, unit: "%", icon: Brain, color: "purple", trend: "+2.1%", up: true },
  { title: "Energy Saved", value: 1247, unit: "kWh", icon: Zap, color: "yellow", trend: "-3.4%", up: false },
  { title: "Active Users", value: 342, unit: "", icon: Users, color: "indigo", trend: "+18.7%", up: true },
  { title: "Collection Points", value: 28, unit: "", icon: MapPin, color: "pink", trend: "+7.1%", up: true },
  { title: "System Uptime", value: 99.8, unit: "%", icon: Activity, color: "cyan", trend: "+0.2%", up: true },
  { title: "Processing Speed", value: 847, unit: "items/hr", icon: Cpu, color: "orange", trend: "+23.4%", up: true },
  { title: "Storage Used", value: 67.3, unit: "%", icon: HardDrive, color: "red", trend: "+5.8%", up: true },
  { title: "Network Quality", value: 98.2, unit: "%", icon: Wifi, color: "teal", trend: "+1.3%", up: true },
  { title: "Security Score", value: 95.6, unit: "%", icon: Shield, color: "violet", trend: "+4.2%", up: true },
]

const wasteTypesData = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  type: ["Organic", "Plastic", "Paper", "Metal", "Glass", "E-waste", "Textile", "Hazardous"][i % 8],
  quantity: Math.floor(Math.random() * 500) + 50,
  percentage: Math.floor(Math.random() * 30) + 5,
  trend: Math.random() > 0.5 ? "up" : "down",
  change: `${Math.floor(Math.random() * 20) + 1}%`,
  lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
}))

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "AI Engineer",
    avatar: "/placeholder.svg",
    status: "online",
    tasks: 12,
    efficiency: 94,
  },
  { name: "Mike Chen", role: "Data Scientist", avatar: "/placeholder.svg", status: "online", tasks: 8, efficiency: 87 },
  { name: "Emily Davis", role: "System Admin", avatar: "/placeholder.svg", status: "away", tasks: 15, efficiency: 91 },
  {
    name: "Alex Rodriguez",
    role: "IoT Specialist",
    avatar: "/placeholder.svg",
    status: "online",
    tasks: 6,
    efficiency: 96,
  },
  { name: "Lisa Wang", role: "UX Designer", avatar: "/placeholder.svg", status: "offline", tasks: 9, efficiency: 89 },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg",
    status: "online",
    tasks: 11,
    efficiency: 93,
  },
]

const timelineEvents = [
  { time: "2 min ago", event: "AI model updated", type: "system", icon: Brain },
  { time: "5 min ago", event: "New waste batch processed", type: "processing", icon: Recycle },
  { time: "12 min ago", event: "Zone C reached capacity", type: "alert", icon: AlertTriangle },
  { time: "18 min ago", event: "User John Doe logged in", type: "user", icon: Users },
  { time: "25 min ago", event: "Backup completed successfully", type: "system", icon: CheckCircle },
  { time: "32 min ago", event: "Energy optimization activated", type: "efficiency", icon: Zap },
  { time: "45 min ago", event: "New collection route added", type: "logistics", icon: MapPin },
  { time: "1 hr ago", event: "Weekly report generated", type: "report", icon: BarChart3 },
]

const activityFeed = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  user: ["Sarah J.", "Mike C.", "Emily D.", "Alex R.", "Lisa W."][i % 5],
  action: ["classified", "processed", "updated", "reviewed", "optimized"][i % 5],
  target: ["plastic waste", "organic matter", "system settings", "AI model", "energy usage"][i % 5],
  time: `${Math.floor(Math.random() * 60) + 1} min ago`,
  status: ["success", "warning", "info"][i % 3],
}))

const goals = [
  { title: "Reduce Contamination", current: 87, target: 95, unit: "%" },
  { title: "Increase Recycling Rate", current: 72, target: 80, unit: "%" },
  { title: "Energy Efficiency", current: 1247, target: 1500, unit: "kWh saved" },
  { title: "AI Accuracy", current: 94.7, target: 98, unit: "%" },
  { title: "User Adoption", current: 342, target: 500, unit: "active users" },
  { title: "Processing Speed", current: 847, target: 1000, unit: "items/hr" },
]

const notifications = [
  {
    id: 1,
    title: "System Update Available",
    message: "New AI model ready for deployment",
    type: "info",
    time: "5 min ago",
  },
  {
    id: 2,
    title: "High Contamination Alert",
    message: "Zone C showing 23% contamination rate",
    type: "warning",
    time: "12 min ago",
  },
  {
    id: 3,
    title: "Backup Completed",
    message: "Daily backup finished successfully",
    type: "success",
    time: "1 hr ago",
  },
  { id: 4, title: "Maintenance Required", message: "Conveyor belt needs inspection", type: "error", time: "2 hr ago" },
]

const tasks = [
  { id: 1, title: "Update AI training data", completed: false, priority: "high", assignee: "Sarah J." },
  { id: 2, title: "Review contamination reports", completed: true, priority: "medium", assignee: "Mike C." },
  { id: 3, title: "Optimize energy consumption", completed: false, priority: "low", assignee: "Emily D." },
  { id: 4, title: "Deploy new classification model", completed: false, priority: "high", assignee: "Alex R." },
  { id: 5, title: "Design user interface updates", completed: true, priority: "medium", assignee: "Lisa W." },
]

const radarData = [
  { subject: "Accuracy", A: 94, B: 87, fullMark: 100 },
  { subject: "Speed", A: 89, B: 92, fullMark: 100 },
  { subject: "Efficiency", A: 91, B: 85, fullMark: 100 },
  { subject: "Reliability", A: 96, B: 89, fullMark: 100 },
  { subject: "Sustainability", A: 88, B: 91, fullMark: 100 },
  { subject: "Innovation", A: 93, B: 86, fullMark: 100 },
]

const heatmapData = Array.from({ length: 24 }, (_, hour) =>
  Array.from({ length: 7 }, (_, day) => ({
    hour,
    day,
    value: Math.floor(Math.random() * 100),
  })),
).flat()

const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/placeholder.svg?height=200&width=300`,
  title: `Waste Sample ${i + 1}`,
  type: ["Organic", "Plastic", "Paper", "Metal"][i % 4],
  confidence: Math.floor(Math.random() * 20) + 80,
  timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleString(),
}))

export function MassiveDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<number[]>([2, 5])

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

  return (
    <div className="min-h-screen relative">
      {/* 3D Background for Dashboard */}
      {(activeTab === "overview" || activeTab === "demo") && <Enhanced3DBackground />}

      <div className="relative z-10 bg-gradient-to-br from-slate-50/90 to-slate-100/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-sm min-h-screen">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
          >
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Waste Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Advanced AI-Powered Ecosystem Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  4
                </Badge>
              </Button>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                All Systems Online
              </Badge>
            </div>
          </motion.div>

          {/* Notifications Panel */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-20 right-4 w-80 z-50"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Notifications
                    <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === "success"
                            ? "bg-green-500"
                            : notif.type === "warning"
                              ? "bg-yellow-500"
                              : notif.type === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{notif.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="demo">Demo</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Extended KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {extendedKPIData.map((kpi, index) => (
                  <motion.div
                    key={kpi.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{kpi.title}</p>
                            <div className="flex items-baseline gap-2 mt-1">
                              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {kpi.value}
                                <span className="text-sm font-normal text-slate-500 ml-1">{kpi.unit}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              {kpi.up ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              )}
                              <span className={`text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-600"}`}>
                                {kpi.trend}
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

              {/* Goals Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Goals & Targets
                  </CardTitle>
                  <CardDescription>Track progress towards key objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal, index) => (
                      <div key={goal.title} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{goal.title}</h4>
                          <Badge variant="outline">
                            {goal.current}/{goal.target} {goal.unit}
                          </Badge>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {Math.round((goal.current / goal.target) * 100)}% complete
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Battery className="h-5 w-5" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "CPU Usage", value: 45, color: "blue" },
                      { name: "Memory", value: 67, color: "green" },
                      { name: "Storage", value: 23, color: "yellow" },
                      { name: "Network", value: 89, color: "purple" },
                    ].map((metric) => (
                      <div key={metric.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Real-time Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {timelineEvents.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <div
                            className={`p-1 rounded-full ${
                              event.type === "alert"
                                ? "bg-red-100 text-red-600"
                                : event.type === "system"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                            }`}
                          >
                            <event.icon className="h-3 w-3" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{event.event}</p>
                            <p className="text-xs text-slate-500">{event.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Radar</CardTitle>
                    <CardDescription>Multi-dimensional system analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Heatmap</CardTitle>
                    <CardDescription>24/7 processing activity visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-24 gap-1">
                      {heatmapData.map((cell, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-sm"
                          style={{
                            backgroundColor: `rgba(34, 197, 94, ${cell.value / 100})`,
                          }}
                          title={`Hour ${cell.hour}, Day ${cell.day}: ${cell.value}%`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                      <span>00:00</span>
                      <span>12:00</span>
                      <span>23:59</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Task Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    Task Management
                  </CardTitle>
                  <CardDescription>Current tasks and assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border">
                        <Checkbox
                          checked={completedTasks.includes(task.id)}
                          onCheckedChange={() => toggleTask(task.id)}
                        />
                        <div className="flex-1">
                          <p
                            className={`font-medium ${completedTasks.includes(task.id) ? "line-through text-slate-500" : ""}`}
                          >
                            {task.title}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Assigned to {task.assignee}</p>
                        </div>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Overview
                  </CardTitle>
                  <CardDescription>Current team status and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div
                                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                    member.status === "online"
                                      ? "bg-green-500"
                                      : member.status === "away"
                                        ? "bg-yellow-500"
                                        : "bg-gray-500"
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{member.name}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{member.role}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-xs">Tasks: {member.tasks}</span>
                                  <span className="text-xs">Efficiency: {member.efficiency}%</span>
                                </div>
                                <Progress value={member.efficiency} className="h-1 mt-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Team Activity Feed
                  </CardTitle>
                  <CardDescription>Recent team activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {activityFeed.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {activity.user.split(" ")[0][0]}
                            {activity.user.split(" ")[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                        <Badge
                          variant={
                            activity.status === "success"
                              ? "default"
                              : activity.status === "warning"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-8">
              {/* Waste Types Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Detailed Waste Analytics
                  </CardTitle>
                  <CardDescription>Comprehensive breakdown of all waste types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity (kg)</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Trend</TableHead>
                          <TableHead>Last Updated</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {wasteTypesData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.type}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.percentage}%</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {item.trend === "up" ? (
                                  <TrendingUp className="h-3 w-3 text-green-500" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 text-red-500" />
                                )}
                                <span className={`text-xs ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                                  {item.change}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                              {item.lastUpdated}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    AI Classification Gallery
                  </CardTitle>
                  <CardDescription>Recent waste samples processed by AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {galleryImages.map((image) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: image.id * 0.05 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video relative">
                            <img
                              src={image.src || "/placeholder.svg"}
                              alt={image.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-2 right-2">{image.confidence}%</Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold">{image.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Type: {image.type}</p>
                            <p className="text-xs text-slate-500 mt-1">{image.timestamp}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Demo Tab with 3D Background */}
            <TabsContent value="demo" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>3D Demo Environment</CardTitle>
                  <CardDescription>Interactive 3D visualization with animated background</CardDescription>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">3D Background Active</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      This tab demonstrates the 3D animated background feature
                    </p>
                    <Button>Interact with 3D Elements</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
