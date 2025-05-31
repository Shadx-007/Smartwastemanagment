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
  Sparkles,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function CleanGlassmorphismDashboard() {
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
      color: "from-purple-500 to-violet-600",
      action: () => setIsProcessing(true),
    },
    {
      title: "Generate Report",
      description: "Download analytics report",
      icon: FileText,
      color: "from-emerald-500 to-green-600",
      action: () => console.log("Generating report..."),
    },
    {
      title: "System Settings",
      description: "Configure preferences",
      icon: Settings,
      color: "from-orange-500 to-amber-600",
      action: () => console.log("Opening settings..."),
    },
    {
      title: "Schedule Maintenance",
      description: "Plan system maintenance",
      icon: Wrench,
      color: "from-rose-500 to-pink-600",
      action: () => console.log("Scheduling maintenance..."),
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
    <div className="min-h-screen bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8 space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Smart Waste
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent ml-4">
              Dashboard
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            AI-powered waste segregation system for a sustainable future
          </p>
        </motion.div>

        {/* Tips for Best Results */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-2xl">
                <Lightbulb className="h-7 w-7 text-amber-400" />
                Tips for Best Results
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">
                Follow these guidelines to improve AI classification accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-white/90">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
          {/* Real-time Processing */}
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                {isProcessing ? (
                  <Loader2 className="h-7 w-7 text-cyan-400 animate-spin" />
                ) : (
                  <Zap className="h-7 w-7 text-cyan-400" />
                )}
                Real-time Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80 text-lg">Instant AI-powered classification with 94.7% accuracy rate</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Processing Speed</span>
                  <span className="text-white font-semibold">847 items/hr</span>
                </div>
                <Progress value={85} className="h-3 bg-white/20" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 py-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
            </CardContent>
          </Card>

          {/* Detailed Analytics */}
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                <BarChart3 className="h-7 w-7 text-emerald-400" />
                Detailed Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80 text-lg">Comprehensive environmental impact tracking and reporting</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-emerald-400">72%</div>
                  <div className="text-sm text-white/70">Recycling Rate</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-cyan-400">2.8T</div>
                  <div className="text-sm text-white/70">CO₂ Saved</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">+15.2% this month</span>
              </div>
            </CardContent>
          </Card>

          {/* Smart Recommendations */}
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                <Brain className="h-7 w-7 text-violet-400" />
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80 text-lg">AI-driven suggestions for optimal waste management</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Recycle className="h-5 w-5 text-emerald-400" />
                  <span className="text-white/90">Increase plastic sorting</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <span className="text-white/90">Optimize organic waste</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Target className="h-5 w-5 text-cyan-400" />
                  <span className="text-white/90">Reduce contamination</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-2xl">
                <Award className="h-7 w-7 text-amber-400" />
                Achievements
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">
                Track your environmental impact milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    variants={itemVariants}
                    className={`relative p-6 rounded-xl border transition-all duration-300 ${
                      achievement.unlocked
                        ? "bg-white/10 border-white/20 hover:bg-white/15"
                        : "bg-white/5 border-white/10 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-r ${achievement.color} ${
                          achievement.unlocked ? "shadow-lg" : "grayscale"
                        }`}
                      >
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{achievement.title}</h3>
                        <p className="text-white/70">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">Progress</span>
                        <span className="text-white font-semibold">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-3 bg-white/20" />
                    </div>
                    {achievement.unlocked && (
                      <div className="absolute top-3 right-3">
                        <Star className="h-6 w-6 text-amber-400 fill-current drop-shadow-lg" />
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
              <CardTitle className="flex items-center gap-3 text-white text-2xl">
                <Camera className="h-7 w-7 text-cyan-400" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">Frequently used dashboard functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div key={action.title} variants={itemVariants}>
                    <Button
                      onClick={action.action}
                      className="w-full h-auto p-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 group shadow-lg"
                      variant="ghost"
                    >
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div
                          className={`p-4 rounded-full bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform shadow-lg`}
                        >
                          <action.icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">{action.title}</div>
                          <div className="text-white/70 mt-1">{action.description}</div>
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
              <CardTitle className="text-4xl font-bold text-white flex items-center justify-center gap-3">
                <Sparkles className="h-8 w-8 text-amber-400" />
                Global Impact
              </CardTitle>
              <CardDescription className="text-white/80 text-xl">
                Our collective environmental contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {globalStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="text-center p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`inline-flex p-5 rounded-full bg-gradient-to-r ${stat.color} mb-6 shadow-lg`}>
                      <stat.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">{stat.value}</div>
                    <div className="text-xl text-white/90 mb-3">{stat.label}</div>
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold text-lg">{stat.change}</span>
                      <span className="text-white/70">this month</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center py-8">
          <p className="text-white/60 text-lg">Powered by AI • Making waste management smarter and more sustainable</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
