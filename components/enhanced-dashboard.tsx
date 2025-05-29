"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Recycle,
  Leaf,
  AlertTriangle,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Camera,
} from "lucide-react"

type TimeRange = "24h" | "7d" | "1m"

// Sample data for different time ranges
const sampleData = {
  "24h": {
    wasteComposition: [
      { name: "00:00", Recyclables: 45, Organic: 30, Landfill: 25 },
      { name: "04:00", Recyclables: 52, Organic: 28, Landfill: 20 },
      { name: "08:00", Recyclables: 68, Organic: 22, Landfill: 10 },
      { name: "12:00", Recyclables: 75, Organic: 20, Landfill: 5 },
      { name: "16:00", Recyclables: 70, Organic: 25, Landfill: 5 },
      { name: "20:00", Recyclables: 60, Organic: 30, Landfill: 10 },
    ],
    totalWaste: "156 kg",
    recyclingRate: "72.3%",
    contamination: "6.1%",
    co2Saved: "89 kg",
  },
  "7d": {
    wasteComposition: [
      { name: "Mon", Recyclables: 400, Organic: 240, Landfill: 160 },
      { name: "Tue", Recyclables: 420, Organic: 230, Landfill: 150 },
      { name: "Wed", Recyclables: 450, Organic: 260, Landfill: 140 },
      { name: "Thu", Recyclables: 470, Organic: 270, Landfill: 130 },
      { name: "Fri", Recyclables: 500, Organic: 280, Landfill: 120 },
      { name: "Sat", Recyclables: 380, Organic: 200, Landfill: 100 },
      { name: "Sun", Recyclables: 350, Organic: 180, Landfill: 90 },
    ],
    totalWaste: "1,248 kg",
    recyclingRate: "68.7%",
    contamination: "8.3%",
    co2Saved: "325 kg",
  },
  "1m": {
    wasteComposition: [
      { name: "Week 1", Recyclables: 2800, Organic: 1680, Landfill: 1120 },
      { name: "Week 2", Recyclables: 3200, Organic: 1800, Landfill: 1000 },
      { name: "Week 3", Recyclables: 3500, Organic: 1900, Landfill: 900 },
      { name: "Week 4", Recyclables: 3800, Organic: 2000, Landfill: 800 },
    ],
    totalWaste: "4,892 kg",
    recyclingRate: "71.2%",
    contamination: "7.1%",
    co2Saved: "1,247 kg",
  },
}

export function EnhancedDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")
  const currentData = sampleData[timeRange]

  const lineChartConfig = {
    Recyclables: { label: "Recyclables", color: "#0ea5e9" },
    Organic: { label: "Organic", color: "#10b981" },
    Landfill: { label: "Landfill", color: "#f59e0b" },
  } satisfies ChartConfig

  const pieChartConfig = {
    Recyclables: { label: "Recyclables", color: "#0ea5e9" },
    Organic: { label: "Organic", color: "#10b981" },
    Landfill: { label: "Landfill", color: "#f59e0b" },
    Hazardous: { label: "Hazardous", color: "#ef4444" },
    "E-waste": { label: "E-waste", color: "#8b5cf6" },
  } satisfies ChartConfig

  const binFillData = [
    { location: "Main Office", fill: 78, status: "normal" },
    { location: "Building A", fill: 92, status: "warning" },
    { location: "Building B", fill: 45, status: "normal" },
    { location: "Cafeteria", fill: 88, status: "warning" },
    { location: "Parking", fill: 34, status: "normal" },
    { location: "Reception", fill: 67, status: "normal" },
  ]

  const recentUploads = [
    { time: "2 min ago", item: "Plastic bottle", confidence: 98, category: "Recyclable" },
    { time: "5 min ago", item: "Food waste", confidence: 95, category: "Organic" },
    { time: "8 min ago", item: "Paper cup", confidence: 87, category: "Recyclable" },
    { time: "12 min ago", item: "Battery", confidence: 99, category: "Hazardous" },
    { time: "15 min ago", item: "Glass jar", confidence: 96, category: "Recyclable" },
  ]

  const aiAlerts = [
    { type: "warning", message: "High contamination detected in Building A recycling bin", time: "10 min ago" },
    { type: "info", message: "New material type detected - updating classification model", time: "1 hour ago" },
    { type: "success", message: "Weekly recycling target achieved", time: "2 hours ago" },
    { type: "warning", message: "Bin capacity at 90% in Cafeteria", time: "3 hours ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Header with time range selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Waste Dashboard</h1>
          <p className="text-muted-foreground">Real-time analytics and AI-powered insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="1m">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Waste Processed",
            value: currentData.totalWaste,
            change: "+12.5%",
            trend: "up",
            icon: Trash2,
          },
          {
            title: "Recycling Rate",
            value: currentData.recyclingRate,
            change: "+5.2%",
            trend: "up",
            icon: Recycle,
          },
          {
            title: "Contamination Rate",
            value: currentData.contamination,
            change: "-2.1%",
            trend: "down",
            icon: AlertTriangle,
          },
          {
            title: "CO₂ Emissions Saved",
            value: currentData.co2Saved,
            change: "+18.3%",
            trend: "up",
            icon: Leaf,
          },
        ].map((card, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center pt-1">
                {card.trend === "up" ? (
                  <Badge variant="outline" className="text-green-500 bg-green-50 dark:bg-green-950/30">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {card.change}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className={
                      card.title.includes("Contamination")
                        ? "text-green-500 bg-green-50 dark:bg-green-950/30"
                        : "text-red-500 bg-red-50 dark:bg-red-950/30"
                    }
                  >
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {card.change}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Waste Composition Trends</CardTitle>
            <CardDescription>
              Waste distribution over {timeRange === "24h" ? "24 hours" : timeRange === "7d" ? "7 days" : "1 month"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={lineChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.wasteComposition}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="Recyclables"
                      stackId="1"
                      stroke="var(--color-Recyclables)"
                      fill="var(--color-Recyclables)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="Organic"
                      stackId="1"
                      stroke="var(--color-Organic)"
                      fill="var(--color-Organic)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="Landfill"
                      stackId="1"
                      stroke="var(--color-Landfill)"
                      fill="var(--color-Landfill)"
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
            <CardTitle>Current Distribution</CardTitle>
            <CardDescription>Real-time waste composition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={pieChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Recyclables", value: 45 },
                        { name: "Organic", value: 30 },
                        { name: "Landfill", value: 15 },
                        { name: "Hazardous", value: 5 },
                        { name: "E-waste", value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { color: "#0ea5e9" },
                        { color: "#10b981" },
                        { color: "#f59e0b" },
                        { color: "#ef4444" },
                        { color: "#8b5cf6" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bin Fill Levels</CardTitle>
            <CardDescription>Real-time monitoring of collection points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {binFillData.map((bin, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${bin.status === "warning" ? "bg-orange-500" : "bg-green-500"}`}
                    />
                    <span className="font-medium">{bin.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={bin.fill} className="w-24" />
                    <span className="text-sm font-medium w-12">{bin.fill}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Classification Accuracy</CardTitle>
            <CardDescription>Real-time performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Paper & Cardboard", accuracy: 97, trend: "up", change: "+2.3%" },
                { category: "Plastic", accuracy: 94, trend: "up", change: "+1.5%" },
                { category: "Glass", accuracy: 98, trend: "up", change: "+0.8%" },
                { category: "Metal", accuracy: 96, trend: "down", change: "-0.5%" },
                { category: "Organic Waste", accuracy: 92, trend: "up", change: "+3.2%" },
                { category: "E-waste", accuracy: 91, trend: "up", change: "+4.1%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{item.category}</div>
                    <Progress value={item.accuracy} className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="font-medium">{item.accuracy}%</span>
                    <Badge variant="outline" className={item.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {item.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Classifications</CardTitle>
            <CardDescription>Latest AI processing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{upload.item}</div>
                      <div className="text-sm text-muted-foreground">{upload.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {upload.category}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{upload.confidence}% confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Alerts & Insights</CardTitle>
            <CardDescription>System notifications and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === "warning"
                        ? "bg-orange-500"
                        : alert.type === "success"
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{alert.message}</div>
                    <div className="text-sm text-muted-foreground">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
