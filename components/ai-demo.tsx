"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, Loader2, CheckCircle, Recycle, Leaf, Zap, Target, Brain, BarChart3 } from "lucide-react"

interface ClassificationResult {
  category: string
  confidence: number
  color: string
  icon: any
  recyclable: boolean
  suggestions: string[]
  environmental_impact: {
    co2_saved?: string
    decomposition_time?: string
    recycling_value?: string
  }
}

const mockResults: { [key: string]: ClassificationResult } = {
  plastic_bottle: {
    category: "Recyclable Plastic",
    confidence: 98.5,
    color: "bg-blue-500",
    icon: Recycle,
    recyclable: true,
    suggestions: [
      "Remove cap and label before recycling",
      "Rinse container to remove residue",
      "Place in blue recycling bin",
    ],
    environmental_impact: {
      co2_saved: "0.5 kg CO₂",
      decomposition_time: "450 years if not recycled",
      recycling_value: "$0.05",
    },
  },
  food_waste: {
    category: "Organic Waste",
    confidence: 95.2,
    color: "bg-green-500",
    icon: Leaf,
    recyclable: false,
    suggestions: ["Compost in organic waste bin", "Can be used for biogas production", "Avoid mixing with recyclables"],
    environmental_impact: {
      decomposition_time: "2-4 weeks in compost",
      co2_saved: "0.2 kg CO₂ through composting",
    },
  },
  battery: {
    category: "Hazardous E-Waste",
    confidence: 99.1,
    color: "bg-red-500",
    icon: Zap,
    recyclable: true,
    suggestions: [
      "Take to specialized e-waste collection point",
      "Never dispose in regular trash",
      "Contains recoverable materials",
    ],
    environmental_impact: {
      decomposition_time: "100+ years",
      recycling_value: "High - contains lithium, cobalt",
    },
  },
}

export function AIDemo() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [history, setHistory] = useState<
    Array<{
      image: string
      result: ClassificationResult
      timestamp: Date
    }>
  >([])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)

  const simulateClassification = useCallback((imageData: string) => {
    setIsProcessing(true)
    setUploadedImage(imageData)

    // Simulate AI processing delay
    setTimeout(() => {
      const resultKeys = Object.keys(mockResults)
      const randomKey = resultKeys[Math.floor(Math.random() * resultKeys.length)]
      const classificationResult = mockResults[randomKey]

      setResult(classificationResult)
      setHistory((prev) => [
        {
          image: imageData,
          result: classificationResult,
          timestamp: new Date(),
        },
        ...prev.slice(0, 4),
      ]) // Keep last 5 results
      setIsProcessing(false)
    }, 2000)
  }, [])

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData = e.target?.result as string
          simulateClassification(imageData)
        }
        reader.readAsDataURL(file)
      }
    },
    [simulateClassification],
  )

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }, [])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg")
        simulateClassification(imageData)

        // Stop camera
        const stream = video.srcObject as MediaStream
        stream?.getTracks().forEach((track) => track.stop())
        setIsCameraActive(false)
      }
    }
  }, [simulateClassification])

  const stopCamera = useCallback(() => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
      setIsCameraActive(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI Waste Classification Demo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Experience our advanced AI system that can identify and classify waste materials with 98%+ accuracy
        </p>
      </div>

      {/* Upload Section */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Classification Engine
          </CardTitle>
          <CardDescription>Upload an image or use your camera to classify waste materials instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload/Camera Controls */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => fileInputRef.current?.click()} className="flex-1" disabled={isProcessing}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  onClick={isCameraActive ? stopCamera : startCamera}
                  variant="outline"
                  className="flex-1"
                  disabled={isProcessing}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {isCameraActive ? "Stop Camera" : "Use Camera"}
                </Button>
              </div>

              {isCameraActive && (
                <div className="space-y-4">
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                  <Button onClick={capturePhoto} className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Capture Photo
                  </Button>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Preview/Results */}
            <div className="space-y-4">
              {uploadedImage && (
                <div className="relative">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded waste item"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <div className="text-center text-white">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>AI Processing...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {result && !isProcessing && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${result.color} text-white`}>
                      <result.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{result.category}</h3>
                      <p className="text-sm text-muted-foreground">{result.confidence}% confidence</p>
                    </div>
                  </div>

                  <Progress value={result.confidence} className="h-2" />

                  <Badge variant={result.recyclable ? "default" : "secondary"}>
                    {result.recyclable ? "Recyclable" : "Non-Recyclable"}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      {result && !isProcessing && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.environmental_impact.co2_saved && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CO₂ Impact:</span>
                    <span className="text-sm font-medium">{result.environmental_impact.co2_saved}</span>
                  </div>
                )}
                {result.environmental_impact.decomposition_time && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Decomposition:</span>
                    <span className="text-sm font-medium">{result.environmental_impact.decomposition_time}</span>
                  </div>
                )}
                {result.environmental_impact.recycling_value && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Recycling Value:</span>
                    <span className="text-sm font-medium">{result.environmental_impact.recycling_value}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Classification History */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Classifications
            </CardTitle>
            <CardDescription>Your latest AI classification results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt="Classified item"
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-full ${item.result.color} text-white`}>
                      <item.result.icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.result.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.result.confidence}% • {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Features Showcase */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Real-time Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-semibold">0.3 seconds</p>
                <p className="text-sm text-muted-foreground">Average processing time</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Our edge-computing AI processes images instantly for immediate classification results.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Multi-Category Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <Target className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-semibold">15+ Categories</p>
                <p className="text-sm text-muted-foreground">Waste types identified</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Identifies recyclables, organic waste, e-waste, hazardous materials, and more with high precision.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Confidence Scoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <Brain className="h-8 w-8 text-purple-500" />
              <div>
                <p className="font-semibold">98%+ Accuracy</p>
                <p className="text-sm text-muted-foreground">Classification confidence</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Each classification includes a confidence score to ensure reliable waste sorting decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
