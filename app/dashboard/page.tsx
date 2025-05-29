"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  ArrowUpRight,
  Trash2,
  Leaf,
  Download,
  CalendarIcon,
  MapPin,
  TrendingUp,
  Activity,
  Globe,
  Zap,
} from "lucide-react"
import { format } from "date-fns"
import { ThreeDBackground } from "@/components/three-d-background"
import WasteFlow3DViewer from "@/components/waste-flow-3d-viewer"

// Mock API data generators
const generateMockStats = () => ({
  processed: Math.floor(Math.random() * 1000) + 12000,
  accuracy: Math.round((Math.random() * 2 + 97) * 10) / 10,
  co2_reduced: Math.round((Math.random() * 2 + 2.5) * 10) / 10,
})

const generateCompositionData = () => [
  { name: "Organic", value: Math.floor(Math.random() * 10) + 40, color: "#22c55e" },
  { name: "Recyclable", value: Math.floor(Math.random() * 10) + 25, color: "#3b82f6" },
  { name: "Hazardous", value: Math.floor(Math.random() * 5) + 3, color: "#ef4444" },
  { name: "Other", value: Math.floor(Math.random() * 10) + 15, color: "#64748b" },
]

const generateTimelineData = () => {
  const data = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: format(time, "HH:mm"),
      processed: Math.floor(Math.random() * 200) + 100,
      accuracy: Math.floor(Math.random() * 5) + 95,
    })
  }

  return data
}

const generateLocationData = () => [
  { name: "Downtown", processed: 2840, lat: 40.7128, lng: -74.006, intensity: 85 },
  { name: "Uptown", processed: 1920, lat: 40.7831, lng: -73.9712, intensity: 65 },
  { name: "Midtown", processed: 3150, lat: 40.7549, lng: -73.984, intensity: 95 },
  { name: "Brooklyn", processed: 2100, lat: 40.6782, lng: -73.9442, intensity: 70 },
  { name: "Queens", processed: 1680, lat: 40.7282, lng: -73.7949, intensity: 55 },
]

export default function DashboardPage() {
  const [stats, setStats] = useState(generateMockStats())
  const [compositionData, setCompositionData] = useState(generateCompositionData())
  const [timelineData, setTimelineData] = useState(generateTimelineData())
  const [locationData, setLocationData] = useState(generateLocationData())
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("24h")

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setStats(generateMockStats())
      setCompositionData(generateCompositionData())
      setTimelineData(generateTimelineData())
    }, 30000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const pieChartConfig = {
    Organic: { label: "Organic", color: "#22c55e" },
    Recyclable: { label: "Recyclable", color: "#3b82f6" },
    Hazardous: { label: "Hazardous", color: "#ef4444" },
    Other: { label: "Other", color: "#64748b" },
  } satisfies ChartConfig

  const lineChartConfig = {
    processed: { label: "Items Processed", color: "#22c55e" },
    accuracy: { label: "Accuracy %", color: "#3b82f6" },
  } satisfies ChartConfig

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* 3D Background */}
      <ThreeDBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Smart Waste Dashboard
            </h1>
            <p className="text-gray-400 text-lg mt-2">Real-time monitoring and analytics</p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              <Label htmlFor="auto-refresh" className="text-gray-300">
                Auto Refresh
              </Label>
            </div>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange ? format(dateRange, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                <Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
              </PopoverContent>
            </Popover>

            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Real-time Stats Cards - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Items Processed Today</CardTitle>
              <Trash2 className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.processed.toLocaleString()}</div>
              <div className="flex items-center pt-1">
                <Badge variant="outline" className="text-green-400 border-green-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5%
                </Badge>
                <span className="text-xs text-gray-400 ml-2">vs yesterday</span>
              </div>
              <Progress value={75} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Current Accuracy Rate</CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.accuracy}%</div>
              <div className="flex items-center pt-1">
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +0.3%
                </Badge>
                <span className="text-xs text-gray-400 ml-2">vs last hour</span>
              </div>
              <Progress value={stats.accuracy} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">CO₂ Reduction</CardTitle>
              <Leaf className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.co2_reduced}kg</div>
              <div className="flex items-center pt-1">
                <Badge variant="outline" className="text-green-400 border-green-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +18.2%
                </Badge>
                <span className="text-xs text-gray-400 ml-2">vs yesterday</span>
              </div>
              <Progress value={65} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Waste Composition Pie Chart */}
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Waste Composition</CardTitle>
              <CardDescription className="text-gray-400">Real-time breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={pieChartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={compositionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {compositionData.map((entry, index) => (
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

          {/* Processing Timeline */}
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Processing Timeline</CardTitle>
              <CardDescription className="text-gray-400">24-hour processing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={lineChartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="processed"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3D Waste Flow Visualization */}
        <div className="mb-8">
          <WasteFlow3DViewer />
        </div>

        {/* Location Heatmap and Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Location Heatmap */}
          <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                Location Activity
              </CardTitle>
              <CardDescription className="text-gray-400">Processing activity by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: `rgba(34, 197, 94, ${location.intensity / 100})`,
                          boxShadow: `0 0 10px rgba(34, 197, 94, ${location.intensity / 200})`,
                        }}
                      />
                      <div>
                        <div className="font-medium text-white">{location.name}</div>
                        <div className="text-sm text-gray-400">{location.processed} items processed</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-400">{location.intensity}%</div>
                      <div className="text-xs text-gray-400">activity</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">System Health</CardTitle>
              <CardDescription className="text-gray-400">Current system status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Network</span>
                </div>
                <Badge className="bg-green-600">Online</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">Processing</span>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Performance</span>
                </div>
                <Badge className="bg-green-600">Optimal</Badge>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">CPU Usage</div>
                <Progress value={45} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">45% of capacity</div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-2">Memory Usage</div>
                <Progress value={62} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">62% of capacity</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
