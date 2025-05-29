"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  HardDrive,
  Zap,
  Thermometer,
  Activity,
  Server,
  Database,
  Wifi,
  MemoryStick,
} from "lucide-react"

interface SystemMetrics {
  timestamp: string
  cpu: number
  memory: number
  disk: number
  network: number
  temperature: number
}

const chartConfig = {
  cpu: {
    label: "CPU Usage",
    color: "#22c55e",
  },
  memory: {
    label: "Memory Usage",
    color: "#16a34a",
  },
  disk: {
    label: "Disk Usage",
    color: "#15803d",
  },
  network: {
    label: "Network",
    color: "#059669",
  },
} satisfies ChartConfig

export function SystemMonitoringSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [metrics, setMetrics] = useState<SystemMetrics[]>([])
  const [currentMetrics, setCurrentMetrics] = useState({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 12,
    temperature: 42,
    uptime: "2d 14h 32m",
  })

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const newMetric: SystemMetrics = {
        timestamp: new Date().toLocaleTimeString(),
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 50,
        disk: Math.floor(Math.random() * 20) + 25,
        network: Math.floor(Math.random() * 25) + 5,
        temperature: Math.floor(Math.random() * 10) + 38,
      }

      setCurrentMetrics((prev) => ({
        ...prev,
        cpu: newMetric.cpu,
        memory: newMetric.memory,
        disk: newMetric.disk,
        network: newMetric.network,
        temperature: newMetric.temperature,
      }))

      setMetrics((prev) => {
        const updated = [...prev, newMetric]
        return updated.slice(-20) // Keep last 20 data points
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, type: string) => {
    if (type === "temperature") {
      if (value > 70) return "text-red-500"
      if (value > 60) return "text-yellow-500"
      return "text-green-500"
    }

    if (value > 80) return "text-red-500"
    if (value > 60) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <>
      {/* Sidebar Tab */}
      <motion.div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50"
        initial={{ x: -40 }}
        animate={{ x: isOpen ? 0 : -40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-32 w-12 rounded-l-none rounded-r-lg bg-green-600 hover:bg-green-700 border-l-0 border-green-500 shadow-lg eco-glow"
          variant="outline"
        >
          <div className="flex flex-col items-center gap-2">
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <div className="sidebar-tab text-xs font-medium">SYSTEM</div>
            <Activity className="h-4 w-4" />
          </div>
        </Button>
      </motion.div>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-green-500/20 z-40 overflow-y-auto"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="border-b border-green-500/20 pb-4">
                <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Monitor
                </h2>
                <p className="text-sm text-green-300/70">Real-time system metrics</p>
              </div>

              {/* Current Status Cards */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-green-950/20 border-green-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-300">CPU</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">{currentMetrics.cpu}%</div>
                    <Progress value={currentMetrics.cpu} className="h-1 mt-1" />
                  </CardContent>
                </Card>

                <Card className="bg-green-950/20 border-green-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MemoryStick className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-300">RAM</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">{currentMetrics.memory}%</div>
                    <Progress value={currentMetrics.memory} className="h-1 mt-1" />
                  </CardContent>
                </Card>

                <Card className="bg-green-950/20 border-green-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-300">Disk</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">{currentMetrics.disk}%</div>
                    <Progress value={currentMetrics.disk} className="h-1 mt-1" />
                  </CardContent>
                </Card>

                <Card className="bg-green-950/20 border-green-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-300">Temp</span>
                    </div>
                    <div className={`text-lg font-bold ${getStatusColor(currentMetrics.temperature, "temperature")}`}>
                      {currentMetrics.temperature}°C
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Info */}
              <Card className="bg-green-950/20 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-400 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-300">Uptime</span>
                    <Badge variant="outline" className="text-green-400 border-green-500/30">
                      {currentMetrics.uptime}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-300">Network</span>
                    <div className="flex items-center gap-1">
                      <Wifi className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">{currentMetrics.network} MB/s</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-300">AI Models</span>
                    <Badge className="bg-green-600 text-black">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Charts */}
              <Card className="bg-green-950/20 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-400">CPU Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-24">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={metrics}>
                          <Area
                            type="monotone"
                            dataKey="cpu"
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

              <Card className="bg-green-950/20 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-400">Memory Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-24">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={metrics}>
                          <Area
                            type="monotone"
                            dataKey="memory"
                            stroke="#16a34a"
                            fill="#16a34a"
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* AI Processing Status */}
              <Card className="bg-green-950/20 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-400 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    AI Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-300">Classification Model</span>
                      <span className="text-green-400">Running</span>
                    </div>
                    <Progress value={85} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-300">Neural Network</span>
                      <span className="text-green-400">Optimizing</span>
                    </div>
                    <Progress value={92} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-300">Data Processing</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <Progress value={78} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
