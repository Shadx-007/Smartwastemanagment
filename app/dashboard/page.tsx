"use client"

import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from "@/components/ui/chart"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from "recharts"
import { ArrowUpRight, ArrowDownRight, Trash2, Recycle, Leaf, AlertTriangle, Download, Calendar, Filter, RefreshCw, MoreHorizontal, TrendingUp, TrendingDown, Zap } from 'lucide-react'

export default function DashboardPage() {
  const lineChartConfig = {
    Recyclables: {
      label: "Recyclables",
      color: "#0ea5e9",
    },
    Organic: {
      label: "Organic",
      color: "#10b981",
    },
    Landfill: {
      label: "Landfill",
      color: "#f59e0b",
    },
  } satisfies ChartConfig

  const pieChartConfig = {
    Recyclables: {
      label: "Recyclables",
      color: "#0ea5e9",
    },
    Organic: {
      label: "Organic",
      color: "#10b981",
    },
    Landfill: {
      label: "Landfill",
      color: "#f59e0b",
    },
    Hazardous: {
      label: "Hazardous",
      color: "#ef4444",
    },
    "E-waste": {
      label: "E-waste",
      color: "#8b5cf6",
    },
  } satisfies ChartConfig

  const barChartConfig = {
    rate: {
      label: "Recycling Rate",
      color: "#0ea5e9",
    },
  } satisfies ChartConfig

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Waste Management Dashboard</h1>
            <p className="text-muted-foreground">Monitor and analyze your waste segregation performance</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="last30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
                <SelectItem value="lastyear">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Waste Processed",
              value: "1,248 kg",
              change: "+12.5%",
              trend: "up",
              description: "vs. previous period",
              icon: Trash2,
            },
            {
              title: "Recycling Rate",
              value: "68.7%",
              change: "+5.2%",
              trend: "up",
              description: "vs. previous period",
              icon: Recycle,
            },
            {
              title: "Contamination Rate",
              value: "8.3%",
              change: "-2.1%",
              trend: "down",
              description: "vs. previous period",
              icon: AlertTriangle,
            },
            {
              title: "CO₂ Emissions Saved",
              value: "325 kg",
              change: "+18.3%",
              trend: "up",
              description: "vs. previous period",
              icon: Leaf,
            },
          ].map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center pt-1">
                  {card.trend === "up" ? (
                    <Badge
                      variant="outline"
                      className="text-green-500 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {card.change}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className={
                        card.title.includes("Contamination")
                          ? "text-green-500 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
                          : "text-red-500 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
                      }
                    >
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {card.change}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground ml-2">{card.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Waste Composition Trends</CardTitle>
                <CardDescription>Daily waste composition over time</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Filter
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={lineChartConfig}>
                  <LineChart
                    data={[
                      { name: "Jan", Recyclables: 400, Organic: 240, Landfill: 160 },
                      { name: "Feb", Recyclables: 420, Organic: 230, Landfill: 150 },
                      { name: "Mar", Recyclables: 450, Organic: 260, Landfill: 140 },
                      { name: "Apr", Recyclables: 470, Organic: 270, Landfill: 130 },
                      { name: "May", Recyclables: 500, Organic: 280, Landfill: 120 },
                      { name: "Jun", Recyclables: 520, Organic: 290, Landfill: 110 },
                      { name: "Jul", Recyclables: 550, Organic: 300, Landfill: 100 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="Recyclables" stroke="var(--color-Recyclables)" strokeWidth={2} />
                    <Line type="monotone" dataKey="Organic" stroke="var(--color-Organic)" strokeWidth={2} />
                    <Line type="monotone" dataKey="Landfill" stroke="var(--color-Landfill)" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waste Composition</CardTitle>
              <CardDescription>Current waste distribution by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={pieChartConfig}>
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
                    >
                      {[
                        { name: "Recyclables", color: "#0ea5e9" },
                        { name: "Organic", color: "#10b981" },
                        { name: "Landfill", color: "#f59e0b" },
                        { name: "Hazardous", color: "#ef4444" },
                        { name: "E-waste", color: "#8b5cf6" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Collection Point Performance</CardTitle>
              <CardDescription>Recycling rates by collection point</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={barChartConfig}>
                  <BarChart
                    data={[
                      { location: "Main Office", rate: 78 },
                      { location: "Building A", rate: 65 },
                      { location: "Building B", rate: 83 },
                      { location: "Cafeteria", rate: 72 },
                      { location: "Parking", rate: 58 },
                      { location: "Reception", rate: 75 },
                    ]}
                    layout="horizontal"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="location" type="category" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="rate" fill="var(--color-rate)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>AI Classification Accuracy</CardTitle>
                <CardDescription>Performance metrics for waste classification</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
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
                  <div key={index} className="flex items-center">
                    <div className="w-1/2">
                      <div className="font-medium">{item.category}</div>
                    </div>
                    <div className="w-1/4 text-right">
                      <div className="font-medium">{item.accuracy}%</div>
                    </div>
                    <div className="w-1/4 flex justify-end">
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

        {/* Recent Activity & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest waste processing events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    time: "Today, 10:30 AM",
                    event: "Large deposit at Building A",
                    details: "23kg of mixed recyclables processed",
                    icon: Recycle,
                    iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
                  },
                  {
                    time: "Today, 9:15 AM",
                    event: "Contamination alert",
                    details: "Non-recyclable items detected in recycling bin at Cafeteria",
                    icon: AlertTriangle,
                    iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
                  },
                  {
                    time: "Yesterday, 4:45 PM",
                    event: "Collection completed",
                    details: "All bins emptied and processed successfully",
                    icon: Zap,
                    iconColor: "text-green-500 bg-green-50 dark:bg-green-950/30",
                  },
                  {
                    time: "Yesterday, 2:30 PM",
                    event: "System maintenance",
                    details: "Software update applied to all collection points",
                    icon: RefreshCw,
                    iconColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.iconColor}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                      <p className="font-medium">{activity.event}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sustainability Insights</CardTitle>
              <CardDescription>Environmental impact of your waste management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    title: "Trees Saved",
                    value: "12",
                    icon: Leaf,
                    iconColor: "text-green-500 bg-green-50 dark:bg-green-950/30",
                  },
                  {
                    title: "Water Saved",
                    value: "5,280 gallons",
                    icon: Zap,
                    iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
                  },
                  {
                    title: "Landfill Space Saved",
                    value: "3.2 cubic yards",
                    icon: Trash2,
                    iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
                  },
                  {
                    title: "Energy Saved",
                    value: "1,450 kWh",
                    icon: Zap,
                    iconColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
                  },
                ].map((insight, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${insight.iconColor}`}>
                        <insight.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{insight.title}</p>
                      <p className="text-xl font-bold">{insight.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View Sustainability Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}