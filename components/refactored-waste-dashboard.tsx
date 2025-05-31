"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Recycle,
  Brain,
  BarChart3,
  Lightbulb,
  Upload,
  FileText,
  Settings,
  Wrench,
  Trophy,
  Leaf,
  Target,
  Users,
  Building,
  Globe,
  Loader2,
  CheckCircle,
  TrendingUp,
  Camera,
  Zap,
  Award,
  Star,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function RefactoredWasteDashboard() {
  const [isProcessing, setIsProcessing] = useState(false)

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
      color: "from-yellow-400 to-orange-500",
      unlocked: true,
    },
    {
      title: "Carbon Saver",
      description: "Saved 500kg CO₂ equivalent",
      icon: Leaf,
      progress: 92,
      color: "from-green-400 to-emerald-500",
      unlocked: true,
    },
    {
      title: "Accuracy Master",
      description: "Achieved 95% classification accuracy",
      icon: Target,
      progress: 78,
      color: "from-blue-400 to-cyan-500",
      unlocked: false,
    },
  ]

  const quickActions = [
    {
      title: "Upload Waste Image",
      description: "Classify new waste items",
      icon: Upload,
      color: "from-blue-500 to-purple-600",
      action: () => setIsProcessing(true),
    },
    {
      title: "Generate Report",
      description: "Download analytics report",
      icon: FileText,
      color: "from-green-500 to-teal-600",
      action: () => console.log("Generating report..."),
    },
    {
      title: "System Settings",
      description: "Configure preferences",
      icon: Settings,
      color: "from-orange-500 to-red-600",
      action: () => console.log("Opening settings..."),
    },
    {
      title: "Schedule Maintenance",
      description: "Plan system maintenance",
      icon: Wrench,
      color: "from-purple-500 to-pink-600",
      action: () => console.log("Scheduling maintenance..."),
    },
  ]

  const globalStats = [
    {
      label: "Active Users",
      value: "12,847",
      icon: Users,
      change: "+23%",
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Cities Served",
      value: "156",
      icon: Building,
      change: "+8%",
      color: "from-green-400 to-green-600",
    },
    {
      label: "CO₂ Saved (tons)",
      value: "2,847",
      icon: Globe,
      change: "+31%",
      color: "from-purple-400 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,200,120,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(200,120,120,0.1),transparent_50%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-8 space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Smart Waste
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent ml-4">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
            AI-powered waste segregation system for a sustainable future
          </p>
        </motion.div>

        {/* Tips Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Pro Tips for Better Results
              </CardTitle>
              <CardDescription className="text-neutral-200">
                Follow these guidelines to improve AI classification accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-200 text-sm">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
          {/* Real-time Processing */}
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                {isProcessing ? (
                  <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
                ) : (
                  <Zap className="h-6 w-6 text-blue-400" />
                )}
                Real-time Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-200">Instant AI-powered classification with 94.7% accuracy rate</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-300">Processing Speed</span>
                  <span className="text-white">847 items/hr</span>
                </div>
                <Progress value={85} className="h-2 bg-white/20" />
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
            </CardContent>
          </Card>

          {/* Detailed Analytics */}
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <BarChart3 className="h-6 w-6 text-green-400" />
                Detailed Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-200">Comprehensive environmental impact tracking and reporting</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-green-400">72%</div>
                  <div className="text-xs text-neutral-300">Recycling Rate</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-blue-400">2.8T</div>
                  <div className="text-xs text-neutral-300">CO₂ Saved</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-green-400 text-sm">+15.2% this month</span>
              </div>
            </CardContent>
          </Card>

          {/* Smart Recommendations */}
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Brain className="h-6 w-6 text-purple-400" />
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-200">AI-driven suggestions for optimal waste management</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <Recycle className="h-4 w-4 text-green-400" />
                  <span className="text-neutral-200 text-sm">Increase plastic sorting</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <Leaf className="h-4 w-4 text-green-400" />
                  <span className="text-neutral-200 text-sm">Optimize organic waste</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-neutral-200 text-sm">Reduce contamination</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Panel */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-6 w-6 text-yellow-400" />
                Achievements
              </CardTitle>
              <CardDescription className="text-neutral-200">Track your environmental impact milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    variants={itemVariants}
                    className={`relative p-6 rounded-xl border ${
                      achievement.unlocked ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-r ${achievement.color} ${
                          achievement.unlocked ? "" : "grayscale"
                        }`}
                      >
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{achievement.title}</h3>
                        <p className="text-sm text-neutral-300">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-300">Progress</span>
                        <span className="text-white">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2 bg-white/20" />
                    </div>
                    {achievement.unlocked && (
                      <div className="absolute top-2 right-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
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
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Camera className="h-6 w-6 text-blue-400" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-neutral-200">Frequently used dashboard functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div key={action.title} variants={itemVariants}>
                    <Button
                      onClick={action.action}
                      className="w-full h-auto p-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 group"
                      variant="ghost"
                    >
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div
                          className={`p-3 rounded-full bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform`}
                        >
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{action.title}</div>
                          <div className="text-sm text-neutral-300 mt-1">{action.description}</div>
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
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white">Global Impact</CardTitle>
              <CardDescription className="text-neutral-200 text-lg">
                Our collective environmental contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {globalStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-lg text-neutral-200 mb-2">{stat.label}</div>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-medium">{stat.change}</span>
                      <span className="text-neutral-300 text-sm">this month</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center py-8">
          <p className="text-neutral-400">Powered by AI • Making waste management smarter and more sustainable</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
