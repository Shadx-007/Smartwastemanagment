"use client"

import { useState, useCallback } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDropzone } from "react-dropzone"
import {
  Upload,
  FileImage,
  Loader2,
  CheckCircle,
  AlertCircle,
  Recycle,
  Leaf,
  BarChart3,
  Camera,
  Brain,
  Eye,
  Cpu,
  Database,
  Shield,
  Microscope,
  Beaker,
  FlaskConical,
  Atom,
  Users,
  Building,
  Globe,
  TrendingUp,
  Star,
  Award,
  Lightbulb,
  Trash2,
  RefreshCw,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
} from "recharts"
import Enhanced3DRing from "@/components/enhanced-3d-ring"

type AnalysisState = "idle" | "uploading" | "processing" | "completed" | "error"

type AnalysisResult = {
  organic: number
  inorganic: number
  recyclable: number
  hazardous: number
  co2_reduction: number
}

type ErrorType = "file-too-large" | "invalid-format" | "unclear-image" | "unrecognized-waste" | "network-error"

const CHART_COLORS = {
  organic: "#22c55e",
  inorganic: "#64748b",
  recyclable: "#3b82f6",
  hazardous: "#ef4444",
}

const chartConfig = {
  organic: {
    label: "Organic",
    color: CHART_COLORS.organic,
  },
  inorganic: {
    label: "Inorganic",
    color: CHART_COLORS.inorganic,
  },
  recyclable: {
    label: "Recyclable",
    color: CHART_COLORS.recyclable,
  },
  hazardous: {
    label: "Hazardous",
    color: CHART_COLORS.hazardous,
  },
}

const ERROR_MESSAGES: Record<ErrorType, string> = {
  "file-too-large": "File too large - try under 5MB",
  "invalid-format": "Please upload JPG, PNG, or WEBP format",
  "unclear-image": "Please upload a clearer waste image",
  "unrecognized-waste": "Our AI is learning! This waste type isn't recognized yet",
  "network-error": "Connection issue - please try again",
}

// Extended demo data
const wasteProcessingData = [
  { month: "Jan", processed: 2400, recycled: 1800, co2Saved: 45 },
  { month: "Feb", processed: 2800, recycled: 2100, co2Saved: 52 },
  { month: "Mar", processed: 3200, recycled: 2400, co2Saved: 58 },
  { month: "Apr", processed: 3600, recycled: 2700, co2Saved: 65 },
  { month: "May", processed: 4000, recycled: 3000, co2Saved: 72 },
  { month: "Jun", processed: 4400, recycled: 3300, co2Saved: 78 },
]

const carbonCreditData = [
  { month: "Jan", credits: 120, value: 2400 },
  { month: "Feb", credits: 145, value: 2900 },
  { month: "Mar", credits: 168, value: 3360 },
  { month: "Apr", credits: 192, value: 3840 },
  { month: "May", credits: 215, value: 4300 },
  { month: "Jun", credits: 238, value: 4760 },
]

const performanceRadarData = [
  { subject: "Accuracy", A: 94, fullMark: 100 },
  { subject: "Speed", A: 87, fullMark: 100 },
  { subject: "Efficiency", A: 91, fullMark: 100 },
  { subject: "Reliability", A: 96, fullMark: 100 },
  { subject: "Sustainability", A: 89, fullMark: 100 },
  { subject: "Innovation", A: 93, fullMark: 100 },
]

const aiFeatures = [
  {
    title: "Computer Vision",
    description: "Advanced image recognition using deep learning neural networks",
    icon: Eye,
    accuracy: 94.7,
    color: "from-amber-400 to-yellow-500",
    features: ["Real-time object detection", "Multi-angle analysis", "Texture recognition", "Color classification"],
  },
  {
    title: "Neural Processing",
    description: "Real-time classification with optimized AI models",
    icon: Cpu,
    accuracy: 97.2,
    color: "from-purple-400 to-violet-500",
    features: ["GPU acceleration", "Edge computing", "Parallel processing", "Model optimization"],
  },
  {
    title: "Data Analytics",
    description: "Comprehensive waste pattern analysis and insights",
    icon: Database,
    accuracy: 91.8,
    color: "from-green-400 to-emerald-500",
    features: ["Trend analysis", "Predictive modeling", "Pattern recognition", "Statistical insights"],
  },
  {
    title: "Security Layer",
    description: "Encrypted data processing with privacy protection",
    icon: Shield,
    accuracy: 99.1,
    color: "from-orange-400 to-red-500",
    features: ["End-to-end encryption", "Privacy compliance", "Secure transmission", "Data anonymization"],
  },
]

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Environmental Scientist",
    company: "GreenTech Solutions",
    content: "This AI system has revolutionized our waste management process. The accuracy is incredible!",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Sustainability Director",
    company: "EcoCity Initiative",
    content: "We've reduced contamination by 78% since implementing this technology. Outstanding results!",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Lead",
    company: "Climate Action Lab",
    content: "The real-time analytics and CO₂ tracking features are game-changing for our research.",
    rating: 5,
    avatar: "EW",
  },
]

const wasteExamples = [
  {
    type: "Organic",
    items: ["Food scraps", "Garden waste", "Coffee grounds", "Fruit peels", "Vegetable trimmings"],
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
    recyclable: true,
    co2Impact: "High positive impact - can be composted",
  },
  {
    type: "Plastic",
    items: ["PET bottles", "HDPE containers", "PP packaging", "PVC pipes", "Plastic bags"],
    icon: Recycle,
    color: "from-blue-500 to-cyan-600",
    recyclable: "Partially - depends on type",
    co2Impact: "High negative impact if not recycled",
  },
  {
    type: "Metal",
    items: ["Aluminum cans", "Steel containers", "Copper wiring", "Tin foil", "Metal bottle caps"],
    icon: Trash2,
    color: "from-gray-500 to-slate-600",
    recyclable: true,
    co2Impact: "Medium positive impact when recycled",
  },
  {
    type: "Hazardous",
    items: ["Batteries", "Electronics", "Paint", "Chemicals", "Medical waste"],
    icon: AlertCircle,
    color: "from-red-500 to-rose-600",
    recyclable: "Special processing required",
    co2Impact: "Severe negative impact if improperly disposed",
  },
]

const wasteTips = [
  {
    title: "Reduce Contamination",
    description: "Clean recyclables before disposal to prevent contamination of entire batches",
    icon: RefreshCw,
  },
  {
    title: "Separate Properly",
    description: "Use different bins for different waste types to maximize recycling efficiency",
    icon: Trash2,
  },
  {
    title: "Know Local Rules",
    description: "Different regions have different recycling capabilities - check local guidelines",
    icon: Globe,
  },
  {
    title: "Compost Organics",
    description: "Composting organic waste reduces methane emissions from landfills",
    icon: Leaf,
  },
]

export default function DemoPage() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [errorType, setErrorType] = useState<ErrorType | null>(null)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors.some((e: any) => e.code === "file-too-large")) {
        setErrorType("file-too-large")
      } else if (rejection.errors.some((e: any) => e.code === "file-invalid-type")) {
        setErrorType("invalid-format")
      }
      setAnalysisState("error")
      return
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setUploadedFile(file)
      setAnalysisState("uploading")
      setErrorType(null)

      let currentProgress = 0
      const uploadInterval = setInterval(() => {
        currentProgress += Math.random() * 30
        if (currentProgress >= 100) {
          clearInterval(uploadInterval)
          setProgress(100)
          setTimeout(() => {
            setAnalysisState("processing")
            simulateAnalysis()
          }, 500)
        } else {
          setProgress(currentProgress)
        }
      }, 200)
    }
  }, [])

  const simulateAnalysis = () => {
    setTimeout(
      () => {
        const errorChance = Math.random()
        if (errorChance < 0.1) {
          setErrorType("unclear-image")
          setAnalysisState("error")
          return
        } else if (errorChance < 0.15) {
          setErrorType("unrecognized-waste")
          setAnalysisState("error")
          return
        }

        const mockResult: AnalysisResult = {
          organic: Math.floor(Math.random() * 40) + 40,
          recyclable: Math.floor(Math.random() * 30) + 10,
          inorganic: Math.floor(Math.random() * 20) + 5,
          hazardous: Math.floor(Math.random() * 10) + 2,
          co2_reduction: Math.round((Math.random() * 3 + 1) * 10) / 10,
        }

        const total = mockResult.organic + mockResult.recyclable + mockResult.inorganic + mockResult.hazardous
        mockResult.organic = Math.round((mockResult.organic / total) * 100)
        mockResult.recyclable = Math.round((mockResult.recyclable / total) * 100)
        mockResult.inorganic = Math.round((mockResult.inorganic / total) * 100)
        mockResult.hazardous = 100 - mockResult.organic - mockResult.recyclable - mockResult.inorganic

        setAnalysisResult(mockResult)
        setAnalysisState("completed")
      },
      2000 + Math.random() * 2000,
    )
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  })

  const resetDemo = () => {
    setAnalysisState("idle")
    setUploadedFile(null)
    setAnalysisResult(null)
    setErrorType(null)
    setProgress(0)
  }

  const chartData = analysisResult
    ? [
        { name: "Organic", value: analysisResult.organic, fill: CHART_COLORS.organic },
        { name: "Recyclable", value: analysisResult.recyclable, fill: CHART_COLORS.recyclable },
        { name: "Inorganic", value: analysisResult.inorganic, fill: CHART_COLORS.inorganic },
        { name: "Hazardous", value: analysisResult.hazardous, fill: CHART_COLORS.hazardous },
      ]
    : []

  return (
    <MainLayout>
      <div className="relative">
        {/* Hero Section - Clean black background with centered title */}
        <div className="relative bg-black">
          {/* Header section - centered and prominent */}
          <div className="bg-black py-20">
            <div className="container mx-auto px-4 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center space-y-8"
              >
                <Badge
                  className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30 px-6 py-2 text-lg"
                  variant="outline"
                >
                  AI-Powered Demo
                </Badge>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl">
                  Waste Analysis
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent ml-4">
                    Demo
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto drop-shadow-lg">
                  Upload an image of waste and see our AI classify it in real-time with detailed composition analysis
                </p>
              </motion.div>
            </div>
          </div>

          {/* Ring positioned only behind the header, more contained */}
          <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden z-10">
            <Enhanced3DRing opacity={0.6} color="#d4af37" scale={0.95} height="600px" rotationSpeed={0.0005} />
          </div>
        </div>

        {/* Content area with transparent background */}
        <div className="relative">
          <div className="container mx-auto px-4 py-16 space-y-16">
            {/* Main Demo Interface */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <WasteAnalysisDemo
                analysisState={analysisState}
                uploadedFile={uploadedFile}
                analysisResult={analysisResult}
                errorType={errorType}
                progress={progress}
                onDrop={onDrop}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                resetDemo={resetDemo}
                chartData={chartData}
              />
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Real-time Processing",
                  description: "Get instant waste classification results with our optimized AI model",
                  icon: Loader2,
                  color: "from-amber-400 to-yellow-500",
                },
                {
                  title: "Detailed Analytics",
                  description: "Comprehensive breakdown of waste composition and environmental impact",
                  icon: BarChart3,
                  color: "from-emerald-400 to-green-500",
                },
                {
                  title: "Smart Recommendations",
                  description: "Receive personalized tips for better waste management practices",
                  icon: Recycle,
                  color: "from-violet-400 to-purple-500",
                },
              ].map((feature, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05, y: -10 }} transition={{ duration: 0.3 }}>
                  <Card className="text-center bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500">
                    <CardContent className="pt-8 pb-8">
                      <div
                        className={`p-6 rounded-full bg-gradient-to-r ${feature.color} mx-auto mb-6 w-fit shadow-2xl`}
                      >
                        <feature.icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-semibold mb-4 text-white text-2xl">{feature.title}</h3>
                      <p className="text-white/80 text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Waste Recognition Examples */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-4xl">
                    <Award className="h-10 w-10 text-amber-400" />
                    Waste Recognition Examples
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Our AI can identify and classify these common waste types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wasteExamples.map((example, index) => (
                      <motion.div
                        key={example.type}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-300"
                      >
                        <div className={`p-4 rounded-full bg-gradient-to-r ${example.color} w-fit mb-4`}>
                          <example.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-3">{example.type} Waste</h3>
                        <div className="space-y-2 mb-4">
                          <p className="text-white/70">Common items:</p>
                          <ul className="text-white/80 space-y-1">
                            {example.items.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-3 border-t border-white/10 text-sm">
                          <p className="flex justify-between text-white/70">
                            <span>Recyclable:</span>
                            <span className="text-white">{example.recyclable.toString()}</span>
                          </p>
                          <p className="flex justify-between text-white/70 mt-1">
                            <span>CO₂ Impact:</span>
                            <span className="text-white">{example.co2Impact}</span>
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Features Deep Dive */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-4xl">
                    <Brain className="h-10 w-10 text-amber-400" />
                    AI Technology Deep Dive
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Explore the advanced AI capabilities powering our waste classification system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {aiFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-8 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`p-4 rounded-full bg-gradient-to-r ${feature.color}`}>
                            <feature.icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white text-2xl font-semibold">{feature.title}</h3>
                            <p className="text-white/70 text-lg">{feature.description}</p>
                          </div>
                        </div>
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white/70">Accuracy Rate</span>
                            <span className="text-white font-bold text-xl">{feature.accuracy}%</span>
                          </div>
                          <Progress value={feature.accuracy} className="h-4 bg-black/50" />
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold text-lg">Key Features:</h4>
                          {feature.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-amber-400" />
                              <span className="text-white/80">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analytics Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Waste Processing Trends */}
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Waste Processing Trends</CardTitle>
                  <CardDescription className="text-white/80">
                    Monthly processing and recycling statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        processed: { color: "#22c55e", label: "Processed" },
                        recycled: { color: "#3b82f6", label: "Recycled" },
                      }}
                    >
                      <LineChart data={wasteProcessingData}>
                        <XAxis dataKey="month" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="processed" stroke="#22c55e" strokeWidth={3} />
                        <Line type="monotone" dataKey="recycled" stroke="#3b82f6" strokeWidth={3} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Carbon Credits */}
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Carbon Credits Earned</CardTitle>
                  <CardDescription className="text-white/80">Environmental impact and credit value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        credits: { color: "#d4af37", label: "Carbon Credits" },
                      }}
                    >
                      <AreaChart data={carbonCreditData}>
                        <XAxis dataKey="month" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="credits" stroke="#d4af37" fill="#d4af37" fillOpacity={0.3} />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Radar Chart - Fixed spacing */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="mb-16"
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-3xl">System Performance Analysis</CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Multi-dimensional performance metrics across key areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-16">
                  <div className="h-[700px]">
                    <ChartContainer
                      config={{
                        A: { color: "#22c55e", label: "Performance" },
                      }}
                    >
                      <RadarChart data={performanceRadarData}>
                        <PolarGrid stroke="#ffffff20" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "#ffffff80", fontSize: 14 }} />
                        <PolarRadiusAxis tick={{ fill: "#ffffff60", fontSize: 12 }} />
                        <Radar
                          name="Performance"
                          dataKey="A"
                          stroke="#22c55e"
                          fill="#22c55e"
                          fillOpacity={0.3}
                          strokeWidth={3}
                        />
                      </RadarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Waste Management Tips */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.0 }}
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-3xl">
                    <Lightbulb className="h-8 w-8 text-amber-400" />
                    Waste Management Tips
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Best practices for effective waste segregation and recycling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wasteTips.map((tip, index) => (
                      <motion.div
                        key={tip.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.2 + index * 0.15 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center mb-4">
                          <tip.icon className="h-6 w-6 text-black" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-2">{tip.title}</h3>
                        <p className="text-white/70">{tip.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonials Section - Fixed spacing */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.1 }}
              className="mt-16"
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-3xl">What Our Users Say</CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Real feedback from environmental professionals worldwide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.4 + index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-8 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center text-black font-bold text-xl">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{testimonial.name}</h3>
                            <p className="text-white/70">{testimonial.role}</p>
                            <p className="text-white/60 text-sm">{testimonial.company}</p>
                          </div>
                        </div>
                        <p className="text-white/80 text-lg mb-4">"{testimonial.content}"</p>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interactive Tutorial Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.7 }}
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-3xl">Interactive Tutorial</CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Learn how to maximize the effectiveness of our AI system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        step: 1,
                        title: "Prepare Your Image",
                        icon: Camera,
                        description: "Ensure good lighting and clear focus",
                      },
                      {
                        step: 2,
                        title: "Upload & Analyze",
                        icon: Upload,
                        description: "Drag and drop or click to upload",
                      },
                      {
                        step: 3,
                        title: "Review Results",
                        icon: BarChart3,
                        description: "Examine detailed classification data",
                      },
                      { step: 4, title: "Take Action", icon: Recycle, description: "Implement recommended practices" },
                    ].map((tutorial, index) => (
                      <motion.div
                        key={tutorial.step}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 3 + index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-6 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center mx-auto mb-4">
                          <span className="text-black font-bold text-xl">{tutorial.step}</span>
                        </div>
                        <tutorial.icon className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-lg mb-2">{tutorial.title}</h3>
                        <p className="text-white/70">{tutorial.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Global Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.3 }}
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-4xl flex items-center justify-center gap-4">
                    <Globe className="h-10 w-10 text-amber-400" />
                    Global Impact Dashboard
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Real-time worldwide environmental impact metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        label: "Active Users",
                        value: "12,847",
                        change: "+23%",
                        icon: Users,
                        color: "from-amber-400 to-yellow-500",
                      },
                      {
                        label: "Cities Served",
                        value: "156",
                        change: "+8%",
                        icon: Building,
                        color: "from-emerald-400 to-green-500",
                      },
                      {
                        label: "CO₂ Saved (tons)",
                        value: "2,847",
                        change: "+31%",
                        icon: Leaf,
                        color: "from-violet-400 to-purple-500",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 3.6 + index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-8 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-300"
                      >
                        <div className={`inline-flex p-6 rounded-full bg-gradient-to-r ${stat.color} mb-6 shadow-2xl`}>
                          <stat.icon className="h-12 w-12 text-white" />
                        </div>
                        <div className="text-5xl font-bold text-white mb-3 drop-shadow-lg">{stat.value}</div>
                        <div className="text-xl text-white/90 mb-3">{stat.label}</div>
                        <div className="flex items-center justify-center gap-2">
                          <TrendingUp className="h-5 w-5 text-amber-400" />
                          <span className="text-amber-400 font-semibold">{stat.change}</span>
                          <span className="text-white/70">this month</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Research & Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.9 }}
            >
              <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-3xl flex items-center gap-3">
                    <Microscope className="h-8 w-8 text-amber-400" />
                    Research & Innovation Lab
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xl">
                    Cutting-edge developments in AI-powered waste management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Quantum Classification",
                        description:
                          "Next-generation quantum computing algorithms for ultra-precise waste identification",
                        icon: Atom,
                        progress: 67,
                        color: "from-amber-400 to-yellow-500",
                      },
                      {
                        title: "Bio-degradation Prediction",
                        description: "AI models predicting decomposition rates and environmental impact",
                        icon: Beaker,
                        progress: 84,
                        color: "from-emerald-400 to-green-500",
                      },
                      {
                        title: "Molecular Analysis",
                        description: "Advanced spectroscopy integration for material composition analysis",
                        icon: FlaskConical,
                        progress: 45,
                        color: "from-violet-400 to-purple-500",
                      },
                      {
                        title: "Predictive Analytics",
                        description: "Machine learning models for waste generation forecasting",
                        icon: Brain,
                        progress: 92,
                        color: "from-amber-400 to-orange-500",
                      },
                    ].map((research, index) => (
                      <motion.div
                        key={research.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 4.2 + index * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-8 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`p-4 rounded-full bg-gradient-to-r ${research.color}`}>
                            <research.icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white text-xl font-semibold">{research.title}</h3>
                            <p className="text-white/70">{research.description}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white/70">Progress</span>
                            <span className="text-white font-semibold">{research.progress}%</span>
                          </div>
                          <Progress value={research.progress} className="h-3 bg-black/50" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.5 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/30">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Waste Management?</h2>
                  <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                    Join thousands of organizations worldwide using our AI-powered platform to create a more sustainable
                    future.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold px-8 py-4 text-lg rounded-xl shadow-lg">
                      Start Free Trial
                    </Button>
                    <Button
                      variant="outline"
                      className="border-amber-500/50 text-white hover:bg-amber-500/10 px-8 py-4 text-lg rounded-xl"
                    >
                      Schedule Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Organized Footer with Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 4.8 }}
              className="text-center py-12"
            >
              <div className="space-y-8">
                <p className="text-white/60 text-xl">
                  Powered by AI • Making waste management smarter and more sustainable
                </p>

                {/* Organized Certification Badges */}
                <div className="space-y-4">
                  <h3 className="text-white/80 text-lg font-semibold">Certifications & Standards</h3>
                  <div className="flex justify-center gap-6 flex-wrap">
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
                      Carbon Neutral
                    </Badge>
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
                      ISO 14001 Certified
                    </Badge>
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">AI Powered</Badge>
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
                      Global Impact
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function WasteAnalysisDemo({
  analysisState,
  uploadedFile,
  analysisResult,
  errorType,
  progress,
  onDrop,
  getRootProps,
  getInputProps,
  isDragActive,
  resetDemo,
  chartData,
}: {
  analysisState: AnalysisState
  uploadedFile: File | null
  analysisResult: AnalysisResult | null
  errorType: ErrorType | null
  progress: number
  onDrop: (acceptedFiles: File[], rejectedFiles: any[]) => void
  getRootProps: any
  getInputProps: any
  isDragActive: boolean
  resetDemo: () => void
  chartData: { name: string; value: number; fill: string }[]
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Upload Zone */}
        <div className="space-y-6">
          <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-dashed border-amber-500/30 hover:border-amber-500/50 transition-all duration-500">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`cursor-pointer text-center space-y-6 ${
                  isDragActive ? "scale-105" : ""
                } transition-transform duration-300`}
              >
                <input {...getInputProps()} />

                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                  {analysisState === "uploading" || analysisState === "processing" ? (
                    <Loader2 className="h-10 w-10 text-black animate-spin" />
                  ) : analysisState === "completed" ? (
                    <CheckCircle className="h-10 w-10 text-black" />
                  ) : analysisState === "error" ? (
                    <AlertCircle className="h-10 w-10 text-black" />
                  ) : (
                    <Upload className="h-10 w-10 text-black" />
                  )}
                </div>

                <div>
                  {analysisState === "idle" && (
                    <>
                      <h3 className="text-2xl font-semibold mb-4 text-white">
                        {isDragActive ? "Drop your image here" : "Upload Waste Image"}
                      </h3>
                      <p className="text-white/80 mb-6 text-lg">Drag and drop an image, or click to browse</p>
                      <Button
                        variant="outline"
                        className="gap-3 border-amber-500/50 text-white hover:bg-amber-500/10 px-6 py-3 text-lg"
                      >
                        <FileImage className="h-5 w-5" />
                        Browse Files
                      </Button>
                    </>
                  )}

                  {analysisState === "uploading" && (
                    <>
                      <h3 className="text-2xl font-semibold mb-4 text-white">Uploading...</h3>
                      <Progress value={progress} className="w-full max-w-md mx-auto h-4 bg-black/50" />
                      <p className="text-white/80 mt-3 text-lg">{Math.round(progress)}% complete</p>
                    </>
                  )}

                  {analysisState === "processing" && (
                    <>
                      <h3 className="text-2xl font-semibold mb-4 text-white">Analyzing with AI...</h3>
                      <p className="text-white/80 text-lg">Our AI is identifying waste composition</p>
                    </>
                  )}

                  {analysisState === "completed" && (
                    <>
                      <h3 className="text-2xl font-semibold mb-4 text-amber-400">Analysis Complete!</h3>
                      <p className="text-white/80 mb-6 text-lg">Check the results panel for detailed breakdown</p>
                      <Button
                        onClick={resetDemo}
                        variant="outline"
                        className="border-amber-500/50 text-white hover:bg-amber-500/10 px-6 py-3"
                      >
                        Analyze Another Image
                      </Button>
                    </>
                  )}

                  {analysisState === "error" && errorType && (
                    <>
                      <h3 className="text-2xl font-semibold mb-4 text-red-400">Analysis Failed</h3>
                      <p className="text-white/80 mb-6 text-lg">{ERROR_MESSAGES[errorType]}</p>
                      <Button
                        onClick={resetDemo}
                        variant="outline"
                        className="border-amber-500/50 text-white hover:bg-amber-500/10 px-6 py-3"
                      >
                        Try Again
                      </Button>
                    </>
                  )}
                </div>

                {uploadedFile && (
                  <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/20">
                    <p className="text-white font-medium text-lg">{uploadedFile.name}</p>
                    <p className="text-white/70">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Supported Formats */}
          <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20">
            <CardContent className="p-6">
              <h4 className="font-medium mb-4 text-white text-lg">Supported Formats</h4>
              <div className="flex flex-wrap gap-3 text-white/80">
                <Badge variant="secondary" className="bg-black/30 text-white border-amber-500/30 px-3 py-1">
                  JPG
                </Badge>
                <Badge variant="secondary" className="bg-black/30 text-white border-amber-500/30 px-3 py-1">
                  PNG
                </Badge>
                <Badge variant="secondary" className="bg-black/30 text-white border-amber-500/30 px-3 py-1">
                  WEBP
                </Badge>
                <span className="text-white/60">• Max 5MB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Results Panel */}
        <div className="space-y-6">
          <Card className="bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/20 min-h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white text-2xl">
                <Recycle className="h-6 w-6 text-amber-400" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {analysisState === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Recycle className="h-10 w-10 text-amber-400" />
                    </div>
                    <p className="text-white/60 text-lg">Upload an image to see AI analysis results</p>
                  </motion.div>
                )}

                {(analysisState === "uploading" || analysisState === "processing") && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <Loader2 className="h-12 w-12 text-amber-400 animate-spin mx-auto mb-6" />
                    <p className="text-white/60 text-lg">Analyzing waste composition...</p>
                  </motion.div>
                )}

                {analysisState === "completed" && analysisResult && (
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="mb-8">
                      <h4 className="font-medium mb-4 text-white text-lg">Waste Composition</h4>
                      <div className="h-64">
                        <ChartContainer config={chartConfig}>
                          <PieChart width={400} height={400}>
                            <Pie
                              dataKey="value"
                              isAnimationActive={true}
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              outerRadius={120}
                              fill="#8884d8"
                              label
                            />
                            <ChartTooltip />
                          </PieChart>
                        </ChartContainer>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {Object.entries(chartConfig).map(([key, config]) => (
                          <div key={key} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                            <span className="text-white/80">{config.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h4 className="font-medium mb-4 text-white text-lg">Environmental Impact</h4>
                      <p className="text-white/80">
                        Estimated CO₂ reduction potential:{" "}
                        <span className="font-semibold text-amber-400">{analysisResult.co2_reduction} tons/year</span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {analysisState === "error" && errorType && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-6" />
                    <p className="text-white/60 text-lg">{ERROR_MESSAGES[errorType]}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
