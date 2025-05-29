"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { TrendingUp, TrendingDown, Zap, Recycle, Leaf, AlertTriangle, Brain, Target, Database, Shield } from 'lucide-react'
import { GlassmorphicCard } from "./glassmorphic-card"

type TimeRange = "24h" | "7d" | "30d"

const generateData = (range: TimeRange) => {
  const baseData = {
    "24h": {
      pieData: [
        { name: "Recyclables", value: 45, color: "#4A90E2" },
        { name: "Organic", value: 30, color: "#50C878" },
        { name: "Hazardous", value: 15, color: "#FF6B6B" },
        { name: "E-waste", value: 10, color: "#9B59B6" }
      ],
      lineData: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        recyclables: Math.floor(Math.random() * 50) + 30,
        organic: Math.floor(Math.random() * 40) + 20,
        hazardous: Math.floor(Math.random() * 20) + 5
      })),
      stats: {
        totalProcessed: "156 kg",
        accuracy: "98.7%",
        efficiency: "+12.5%",
        carbonSaved: "89 kg CO₂"
      }
    },
    "7d": {
      pieData: [
        { name: "Recyclables", value: 48, color: "#4A90E2" },
        { name: "Organic", value: 28, color: "#50C878" },
        { name: "Hazardous", value: 14, color: "#FF6B6B" },
        { name: "E-waste", value: 10, color: "#9B59B6" }
      ],
      lineData: Array.from({ length: 7 }, (_, i) => ({
        hour: `Day ${i + 1}`,
        recyclables: Math.floor(Math.random() * 100) + 200,
        organic: Math.floor(Math.random() * 80) + 150,
        hazardous: Math.floor(Math.random() * 50) + 30
      })),
      stats: {
        totalProcessed: "1.2 tons",
        accuracy: "97.9%",
        efficiency: "+8.3%",
        carbonSaved: "425 kg CO₂"
      }
    },
    "30d": {
      pieData: [
        { name: "Recyclables", value: 52, color: "#4A90E2" },
        { name: "Organic", value: 25, color: "#50C878" },
        { name: "Hazardous", value: 13, color: "#FF6B6B" },
        { name: "E-waste", value: 10, color: "#9B59B6" }
      ],
      lineData: Array.from({ length: 30 }, (_, i) => ({
        hour: `Day ${i + 1}`,
        recyclables: Math.floor(Math.random() * 200) + 400,
        organic: Math.floor(Math.random() * 150) + 300,
        hazardous: Math.floor(Math.random() * 100) + 50
      })),
      stats: {
        totalProcessed: "4.8 tons",
        accuracy: "98.2%",
        efficiency: "+15.7%",
        carbonSaved: "1.8 tons CO₂"
      }
    }
  }
  return baseData[range]
}

export function QuantumDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")
  const [data, setData] = useState(generateData("7d"))
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setData(generateData(timeRange))
      setIsAnimating(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [timeRange])

  const statCards = [
    {
      title: "Total Processed",
      value: data.stats.totalProcessed,
      change: data.stats.efficiency,
      icon: Database,
      trend: "up"
    },
    {
      title: "AI Accuracy",
      value: data.stats.accuracy,
      change: "+2.1%",
      icon: Brain,
      trend: "up"
    },
    {
      title: "Efficiency Gain",
      value: data.stats.efficiency,
      change: "vs last period",
      icon: Target,
      trend: "up"
    },
    {
      title: "Carbon Saved",
      value: data.stats.carbonSaved,
      change: "+18.3%",
      icon: Leaf,
      trend: "up"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Quantum Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time AI-powered waste management insights
          </p>
        </div>
        
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="w-[180px] backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <GlassmorphicCard key={stat.title} delay={index * 0.1}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-amber-500/20 dark:to-orange-500/20">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-amber-400" />
              </div>
              <Badge 
                variant="outline" 
                className="bg-green-500/10 text-green-600 border-green-500/20"
              >
                {stat.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {stat.change}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${stat.title}-${timeRange}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.p>
              </AnimatePresence>
            </div>
          </GlassmorphicCard>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pie Chart */}
        <GlassmorphicCard delay={0.2} className="lg:col-span-1">
          <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Waste Composition
          </h3>
          <div className="h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={timeRange}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </div>
        </GlassmorphicCard>

        {/* Line Chart */}
        <GlassmorphicCard delay={0.3} className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Processing Trends
          </h3>
          <div className="h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={timeRange}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="recyclables" 
                      stroke="#4A90E2" 
                      strokeWidth={3}
                      dot={{ fill: "#4A90E2", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="organic" 
                      stroke="#50C878" 
                      strokeWidth={3}
                      dot={{ fill: "#50C878", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hazardous" 
                      stroke="#FF6B6B" 
                      strokeWidth={3}
                      dot={{ fill: "#FF6B6B", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </div>
        </GlassmorphicCard>
      </div>

      {/* AI Performance Metrics */}
      <GlassmorphicCard delay={0.4}>
        <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
          Neural Network Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Pattern Recognition", value: 98.7, color: "#4A90E2" },
            { label: "Classification Speed", value: 95.2, color: "#50C878" },
            { label: "Contamination Detection", value: 92.8, color: "#9B59B6" }
          ].map((metric, index) => (
            <div key={metric.label} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{metric.label}</span>
                <span className="text-lg font-bold" style={{ color: metric.color }}>
                  {metric.value}%
                </span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
                style={{
                  background: `linear-gradient(to right, ${metric.color}20, ${metric.color}40)`
                }}
              />
            </div>
          ))}
        </div>
      </GlassmorphicCard>
    </div>
  )
}
