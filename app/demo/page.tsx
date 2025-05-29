"use client"

import { useState, useCallback } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDropzone } from "react-dropzone"
import { Upload, FileImage, Loader2, CheckCircle, AlertCircle, Recycle, Leaf, BarChart3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

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

      // Simulate upload progress
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
    // Simulate AI processing time
    setTimeout(
      () => {
        // Random chance of different error types for demo
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

        // Generate mock analysis result
        const mockResult: AnalysisResult = {
          organic: Math.floor(Math.random() * 40) + 40, // 40-80%
          recyclable: Math.floor(Math.random() * 30) + 10, // 10-40%
          inorganic: Math.floor(Math.random() * 20) + 5, // 5-25%
          hazardous: Math.floor(Math.random() * 10) + 2, // 2-12%
          co2_reduction: Math.round((Math.random() * 3 + 1) * 10) / 10, // 1.0-4.0kg
        }

        // Normalize to 100%
        const total = mockResult.organic + mockResult.recyclable + mockResult.inorganic + mockResult.hazardous
        mockResult.organic = Math.round((mockResult.organic / total) * 100)
        mockResult.recyclable = Math.round((mockResult.recyclable / total) * 100)
        mockResult.inorganic = Math.round((mockResult.inorganic / total) * 100)
        mockResult.hazardous = 100 - mockResult.organic - mockResult.recyclable - mockResult.inorganic

        setAnalysisResult(mockResult)
        setAnalysisState("completed")
      },
      2000 + Math.random() * 2000,
    ) // 2-4 seconds
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <Badge className="mb-4" variant="outline">
              AI-Powered Demo
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"> Analysis Demo</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload an image of waste and see our AI classify it in real-time with detailed composition analysis.
            </p>
          </div>

          {/* Main Demo Interface */}
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

          {/* Additional Demo Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-time Processing",
                description: "Get instant waste classification results with our optimized AI model",
                icon: Loader2,
              },
              {
                title: "Detailed Analytics",
                description: "Comprehensive breakdown of waste composition and environmental impact",
                icon: BarChart3,
              },
              {
                title: "Smart Recommendations",
                description: "Receive personalized tips for better waste management practices",
                icon: Recycle,
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
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
          <Card className="bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`cursor-pointer text-center space-y-4 ${
                  isDragActive ? "scale-105" : ""
                } transition-transform duration-200`}
              >
                <input {...getInputProps()} />

                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  {analysisState === "uploading" || analysisState === "processing" ? (
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                  ) : analysisState === "completed" ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : analysisState === "error" ? (
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  ) : (
                    <Upload className="h-8 w-8 text-blue-600" />
                  )}
                </div>

                <div>
                  {analysisState === "idle" && (
                    <>
                      <h3 className="text-lg font-semibold mb-2">
                        {isDragActive ? "Drop your image here" : "Upload Waste Image"}
                      </h3>
                      <p className="text-muted-foreground mb-4">Drag and drop an image, or click to browse</p>
                      <Button variant="outline" className="gap-2">
                        <FileImage className="h-4 w-4" />
                        Browse Files
                      </Button>
                    </>
                  )}

                  {analysisState === "uploading" && (
                    <>
                      <h3 className="text-lg font-semibold mb-2">Uploading...</h3>
                      <Progress value={progress} className="w-full max-w-xs mx-auto" />
                      <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
                    </>
                  )}

                  {analysisState === "processing" && (
                    <>
                      <h3 className="text-lg font-semibold mb-2">Analyzing with AI...</h3>
                      <p className="text-muted-foreground">Our AI is identifying waste composition</p>
                    </>
                  )}

                  {analysisState === "completed" && (
                    <>
                      <h3 className="text-lg font-semibold mb-2 text-green-600">Analysis Complete!</h3>
                      <p className="text-muted-foreground">Check the results panel for detailed breakdown</p>
                      <Button onClick={resetDemo} variant="outline" className="mt-4">
                        Analyze Another Image
                      </Button>
                    </>
                  )}

                  {analysisState === "error" && errorType && (
                    <>
                      <h3 className="text-lg font-semibold mb-2 text-red-600">Analysis Failed</h3>
                      <p className="text-muted-foreground mb-4">{ERROR_MESSAGES[errorType]}</p>
                      <Button onClick={resetDemo} variant="outline">
                        Try Again
                      </Button>
                    </>
                  )}
                </div>

                {uploadedFile && (
                  <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Supported Formats */}
          <Card className="bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">JPG</Badge>
                <Badge variant="secondary">PNG</Badge>
                <Badge variant="secondary">WEBP</Badge>
                <span className="text-xs">• Max 5MB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Results Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-900 dark:bg-slate-800 text-white min-h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-5 w-5" />
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
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Recycle className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-400">Upload an image to see AI analysis results</p>
                  </motion.div>
                )}

                {(analysisState === "uploading" || analysisState === "processing") && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <Loader2 className="h-12 w-12 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-slate-300">
                      {analysisState === "uploading" ? "Processing upload..." : "AI analyzing waste composition..."}
                    </p>
                  </motion.div>
                )}

                {analysisState === "completed" && analysisResult && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Waste Composition Chart */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        Waste Composition
                      </h4>
                      <div className="h-64">
                        <ChartContainer config={chartConfig}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>

                    {/* Text Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            Organic
                          </span>
                          <span className="font-semibold">{analysisResult.organic}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            Recyclable
                          </span>
                          <span className="font-semibold">{analysisResult.recyclable}%</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                            Inorganic
                          </span>
                          <span className="font-semibold">{analysisResult.inorganic}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            Hazardous
                          </span>
                          <span className="font-semibold">{analysisResult.hazardous}%</span>
                        </div>
                      </div>
                    </div>

                    {/* CO2 Impact */}
                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/20">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-400">
                        <Leaf className="h-4 w-4" />
                        Environmental Impact
                      </h4>
                      <p className="text-green-300">
                        Potential <span className="font-bold text-xl">{analysisResult.co2_reduction}kg</span> CO₂
                        reduction
                      </p>
                      <p className="text-sm text-green-400 mt-1">Through proper waste segregation and recycling</p>
                    </div>
                  </motion.div>
                )}

                {analysisState === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-300">Analysis could not be completed</p>
                    <p className="text-slate-400 text-sm mt-2">Please try uploading a different image</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Tips for Best Results</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Ensure good lighting and clear focus</li>
                <li>• Include multiple waste items for better analysis</li>
                <li>• Avoid blurry or dark images</li>
                <li>• Keep file size under 5MB</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
