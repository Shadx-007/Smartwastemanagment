"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Activity, Zap, Recycle } from "lucide-react"

const wasteData = [
  { name: "Recyclables", value: 45, color: "#22c55e" },
  { name: "Organic", value: 30, color: "#10b981" },
  { name: "Hazardous", value: 15, color: "#f59e0b" },
  { name: "E-waste", value: 10, color: "#8b5cf6" },
]

const processingData = [
  { time: "00:00", recyclables: 120, organic: 80, hazardous: 20 },
  { time: "04:00", recyclables: 150, organic: 95, hazardous: 25 },
  { time: "08:00", recyclables: 280, organic: 180, hazardous: 45 },
  { time: "12:00", recyclables: 320, organic: 220, hazardous: 55 },
  { time: "16:00", recyclables: 290, organic: 200, hazardous: 50 },
  { time: "20:00", recyclables: 180, organic: 120, hazardous: 30 },
]

const efficiencyData = [
  { month: "Jan", efficiency: 85, accuracy: 92 },
  { month: "Feb", efficiency: 88, accuracy: 94 },
  { month: "Mar", efficiency: 91, accuracy: 96 },
  { month: "Apr", efficiency: 94, accuracy: 97 },
  { month: "May", efficiency: 96, accuracy: 98 },
  { month: "Jun", efficiency: 98, accuracy: 99 },
]

export function DashboardPreviewSection() {
  return (
    <section className="relative py-32 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(34,197,94,0.1)_50%,transparent_65%)] bg-[length:20px_20px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-xl">
            Live Dashboard Preview
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-400 to-amber-500 bg-clip-text text-transparent">
              Real-time
            </span>
            <br />
            <span className="text-white">Analytics Dashboard</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Monitor waste processing, track environmental impact, and optimize operations with our comprehensive
            analytics platform.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { title: "Items Processed", value: "18,742", change: "+12.5%", icon: Activity, color: "green" },
            { title: "AI Accuracy", value: "98.7%", change: "+2.1%", icon: Zap, color: "amber" },
            { title: "Recycling Rate", value: "76.3%", change: "+8.4%", icon: Recycle, color: "green" },
            { title: "Efficiency", value: "94.2%", change: "+5.7%", icon: TrendingUp, color: "amber" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-xl hover:bg-gray-800/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                    <Badge
                      variant="outline"
                      className={`bg-${stat.color}-500/10 text-${stat.color}-400 border-${stat.color}-500/30`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <p className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Waste Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-white">Waste Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {wasteData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Processing Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-white">24-Hour Processing Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={processingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="recyclables"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="organic"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="hazardous"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Efficiency Trends */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">AI Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ fill: "#22c55e", strokeWidth: 2, r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
