"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDropzone } from "react-dropzone"
import { Upload, FileImage, Loader2, CheckCircle, AlertCircle, Recycle, Leaf, BarChart3, Camera } from "lucide-react"
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

export function WasteAnalysisDemo() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [errorType, setErrorType] = useState<ErrorType | null>(null)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
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
      setErrorType(null)

      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      setAnalysisState("uploading")

      // Simulate realistic upload progress
      let currentProgress = 0
      const uploadInterval = setInterval(() => {
        currentProgress += Math.random() * 25 + 10
        if (currentProgress >= 100) {
          clearInterval(uploadInterval)
          setProgress(100)
          setTimeout(() => {
            setAnalysisState("processing")
            simulateAnalysis()
          }, 800)
        } else {
          setProgress(Math.min(currentProgress, 95))
        }
      }, 300)
    }
  }, [])

  const simulateAnalysis = () => {
    // Simulate AI processing with realistic timing
    setTimeout(
      () => {
        // Random chance of different error types for demo purposes
        const errorChance = Math.random()
        if (errorChance < 0.08) {
          setErrorType("unclear-image")
          setAnalysisState("error")
          return
        } else if (errorChance < 0.12) {
          setErrorType("unrecognized-waste")
          setAnalysisState("error")
          return
        }

        // Generate mock analysis result matching exact API format
        const mockResult: AnalysisResult = {
          organic: Math.floor(Math.random() * 50) + 30, // 30-80%
          recyclable: Math.floor(Math.random() * 30) + 10, // 10-40%
          inorganic: Math.floor(Math.random() * 20) + 5, // 5-25%
          hazardous: Math.floor(Math.random() * 8) + 2, // 2-10%
          co2_reduction: Math.round((Math.random() * 3 + 0.5) * 10) / 10, // 0.5-3.5kg
        }

        // Normalize percentages to exactly 100%
        const total = mockResult.organic + mockResult.recyclable + mockResult.inorganic + mockResult.hazardous
        mockResult.organic = Math.round((mockResult.organic / total) * 100)
        mockResult.recyclable = Math.round((mockResult.recyclable / total) * 100)
        mockResult.inorganic = Math.round((mockResult.inorganic / total) * 100)
        mockResult.hazardous = 100 - mockResult.organic - mockResult.recyclable - mockResult.inorganic

        setAnalysisResult(mockResult)
        setAnalysisState("completed")
      },
      2500 + Math.random() * 2000,
    ) // 2.5-4.5 seconds
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB exactly
    multiple: false,
  })

  const resetDemo = () => {
    setAnalysisState("idle")
    setUploadedFile(null)
    setPreviewUrl(null)
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
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Left Side - Upload Zone */}
      <div className="space-y-6">
        <Card className="bg-white dark:bg-white/95 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 shadow-lg">
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className={`cursor-pointer text-center space-y-6 ${
                isDragActive ? "scale-[1.02] border-blue-500" : ""
              } transition-all duration-200`}
            >
              <input {...getInputProps()} />

              {/* Upload Icon/Status */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center shadow-inner">
                {analysisState === "uploading" || analysisState === "processing" ? (
                  <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                ) : analysisState === "completed" ? (
                  <CheckCircle className="h-10 w-10 text-green-600" />
                ) : analysisState === "error" ? (
                  <AlertCircle className="h-10 w-10 text-red-600" />
                ) : (
                  <Upload className="h-10 w-10 text-blue-600" />
                )}
              </div>

              {/* Upload States */}
              <div className="space-y-4">
                {analysisState === "idle" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {isDragActive ? "Drop your image here" : "Upload Waste Image"}
                    </h3>
                    <p className="text-gray-600">Drag and drop an image, or click to browse</p>
                    <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <FileImage className="h-5 w-5" />
                      Browse Files
                    </Button>
                  </motion.div>
                )}

                {analysisState === "uploading" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">Uploading Image...</h3>
                    <Progress value={progress} className="w-full max-w-sm mx-auto h-3" />
                    <p className="text-gray-600">{Math.round(progress)}% complete</p>
                  </motion.div>
                )}

                {analysisState === "processing" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">AI Analysis in Progress...</h3>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                    <p className="text-gray-600">Identifying waste composition...</p>
                  </motion.div>
                )}

                {analysisState === "completed" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-green-600">Analysis Complete!</h3>
                    <p className="text-gray-600">Check the results panel for detailed breakdown</p>
                    <Button onClick={resetDemo} variant="outline" size="lg" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Analyze Another Image
                    </Button>
                  </motion.div>
                )}

                {analysisState === "error" && errorType && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-bold text-red-600">Analysis Failed</h3>
                    <p className="text-gray-600 font-medium">{ERROR_MESSAGES[errorType]}</p>
                    <Button onClick={resetDemo} variant="outline" size="lg">
                      Try Again
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* File Preview */}
              {uploadedFile && previewUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gray-50 dark:bg-gray-100 rounded-xl border"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Upload preview"
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div className="text-left">
                      <p className="font-medium text-gray-800 truncate max-w-[200px]">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Supported Formats Info */}
        <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">Supported Formats</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                JPG
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                PNG
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                WEBP
              </Badge>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">Maximum file size: 5MB</p>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Results Panel */}
      <div className="space-y-6">
        <Card className="bg-slate-900 text-white min-h-[600px] shadow-2xl">
          <CardHeader className="border-b border-slate-700">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {analysisState === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Recycle className="h-10 w-10 text-slate-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">Ready for Analysis</h3>
                  <p className="text-slate-400">Upload an image to see detailed AI waste composition analysis</p>
                </motion.div>
              )}

              {(analysisState === "uploading" || analysisState === "processing") && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <Loader2 className="h-16 w-16 text-blue-400 animate-spin mx-auto mb-6" />
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">
                    {analysisState === "uploading" ? "Processing Upload..." : "AI Analyzing Image..."}
                  </h3>
                  <p className="text-slate-400">
                    {analysisState === "uploading"
                      ? "Preparing image for analysis"
                      : "Identifying waste composition and environmental impact"}
                  </p>
                </motion.div>
              )}

              {analysisState === "completed" && analysisResult && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Waste Composition Chart */}
                  <div>
                    <h4 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                      <Leaf className="h-5 w-5 text-green-400" />
                      Waste Composition Analysis
                    </h4>
                    <div className="h-80">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={120}
                              paddingAngle={3}
                              dataKey="value"
                              animationBegin={0}
                              animationDuration={1500}
                            >
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                              contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #475569",
                                borderRadius: "8px",
                              }}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  {/* Text Breakdown */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                          <span className="font-medium">Organic</span>
                        </span>
                        <span className="font-bold text-lg">{analysisResult.organic}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                          <span className="font-medium">Recyclable</span>
                        </span>
                        <span className="font-bold text-lg">{analysisResult.recyclable}%</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-slate-500"></div>
                          <span className="font-medium">Inorganic</span>
                        </span>
                        <span className="font-bold text-lg">{analysisResult.inorganic}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-red-500"></div>
                          <span className="font-medium">Hazardous</span>
                        </span>
                        <span className="font-bold text-lg">{analysisResult.hazardous}%</span>
                      </div>
                    </div>
                  </div>

                  {/* CO2 Impact */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-green-900/40 to-green-800/40 rounded-xl p-6 border border-green-500/30"
                  >
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-400 text-lg">
                      <Leaf className="h-5 w-5" />
                      Environmental Impact
                    </h4>
                    <div className="text-center">
                      <p className="text-green-300 text-lg mb-1">Potential CO₂ Reduction</p>
                      <p className="text-green-200 text-4xl font-bold mb-2">{analysisResult.co2_reduction}kg</p>
                      <p className="text-green-400 text-sm">Through proper waste segregation and recycling</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {analysisState === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
                  <h3 className="text-lg font-semibold text-red-300 mb-2">Analysis Failed</h3>
                  <p className="text-slate-400">Please try uploading a different image</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Tips for Better Results */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4 text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Tips for Best Results
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                Ensure good lighting and clear focus
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                Include multiple waste items for better analysis
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                Avoid blurry or dark images
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                Keep file size under 5MB for faster processing
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
