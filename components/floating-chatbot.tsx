"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const quickQuestions = [
  "How does the AI classification work?",
  "What types of waste can be identified?",
  "How accurate is the system?",
  "How to use the dashboard?",
  "What are the recycling benefits?",
  "How to reduce contamination?",
]

const botResponses = {
  classification: [
    "Our AI uses advanced computer vision and machine learning to identify waste materials with 98%+ accuracy. The system analyzes visual features, textures, and shapes to classify items into appropriate categories.",
    "The classification process takes less than 0.3 seconds and can identify over 1,500 different types of materials including plastics, metals, paper, organic waste, and hazardous materials.",
  ],
  types: [
    "Our system can identify 15+ major waste categories including: Recyclable plastics, Paper & cardboard, Glass, Metals, Organic waste, E-waste, Hazardous materials, Textiles, and more.",
    "Each category has subcategories for precise sorting. For example, plastics are classified by type (PET, HDPE, etc.) and recyclability status.",
  ],
  accuracy: [
    "Our AI achieves 98.7% classification accuracy across all waste types. The system continuously learns and improves through feedback loops and new training data.",
    "Confidence scores are provided for each classification, and items with low confidence are flagged for manual review to maintain high accuracy standards.",
  ],
  dashboard: [
    "The dashboard provides real-time analytics including waste composition trends, recycling rates, contamination levels, and environmental impact metrics.",
    "You can filter data by time periods (24h, 7d, 1m), export reports, and monitor bin fill levels across different collection points.",
  ],
  benefits: [
    "Proper recycling reduces landfill waste by up to 75%, saves energy, conserves natural resources, and reduces greenhouse gas emissions.",
    "Our system helps you track your environmental impact including CO₂ savings, trees saved, and water conservation metrics.",
  ],
  contamination: [
    "To reduce contamination: rinse containers, remove caps and labels, separate materials properly, and follow the AI recommendations for each item.",
    "Our system detects contamination in real-time and provides specific guidance on proper disposal methods for each waste type.",
  ],
  default: [
    "I'm here to help with any questions about our Smart Waste Segregation System! You can ask about AI classification, dashboard features, recycling tips, or system usage.",
    "Feel free to ask about waste types, accuracy rates, environmental benefits, or how to get started with the system.",
  ],
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Smart Waste AI Assistant. I can help you with questions about waste classification, dashboard usage, recycling tips, and more. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (
      message.includes("classification") ||
      message.includes("ai") ||
      (message.includes("how") && message.includes("work"))
    ) {
      return botResponses.classification[Math.floor(Math.random() * botResponses.classification.length)]
    } else if (message.includes("type") || message.includes("material") || message.includes("identify")) {
      return botResponses.types[Math.floor(Math.random() * botResponses.types.length)]
    } else if (message.includes("accuracy") || message.includes("accurate") || message.includes("confidence")) {
      return botResponses.accuracy[Math.floor(Math.random() * botResponses.accuracy.length)]
    } else if (message.includes("dashboard") || message.includes("analytics") || message.includes("report")) {
      return botResponses.dashboard[Math.floor(Math.random() * botResponses.dashboard.length)]
    } else if (message.includes("benefit") || message.includes("environment") || message.includes("impact")) {
      return botResponses.benefits[Math.floor(Math.random() * botResponses.benefits.length)]
    } else if (message.includes("contamination") || message.includes("clean") || message.includes("reduce")) {
      return botResponses.contamination[Math.floor(Math.random() * botResponses.contamination.length)]
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
    }
  }

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input
    if (!textToSend.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getResponse(textToSend),
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickQuestion = (question: string) => {
    handleSend(question)
  }

  return (
    <>
      {/* Floating chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 shadow-lg hover:shadow-xl relative"
            aria-label="Open chat"
          >
            <Bot className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
          </Button>
        )}
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-6 right-6 z-50 ${isMinimized ? "w-80" : "w-80 sm:w-96 md:w-[450px]"}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`flex flex-col overflow-hidden border-2 border-blue-200/20 bg-card/95 backdrop-blur-sm dark:border-blue-900/20 ${
                isMinimized ? "h-16" : "h-[500px]"
              }`}
            >
              {/* Chat header */}
              <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600">
                    <Bot className="h-4 w-4 text-white" />
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-medium">Smart Waste AI</h3>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 rounded-full"
                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Quick questions */}
                  <div className="border-b p-3 bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {quickQuestions.slice(0, 3).map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2"
                          onClick={() => handleQuickQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Chat messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="flex flex-col gap-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="flex items-start gap-2 max-w-[85%]">
                            {message.role === "assistant" && (
                              <Avatar className="h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0">
                                <Bot className="h-3 w-3 text-white" />
                              </Avatar>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-600">
                              <Bot className="h-3 w-3 text-white" />
                            </Avatar>
                            <div className="rounded-lg bg-muted p-3">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Chat input */}
                  <div className="border-t p-3">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about waste classification, dashboard, or recycling..."
                        className="flex-1"
                        disabled={isTyping}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isTyping}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
