"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, RotateCcw, Recycle, Leaf, Zap } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply"
}

const quickQuestions = [
  { text: "How does AI sorting work?", icon: Bot },
  { text: "What types of waste can be processed?", icon: Recycle },
  { text: "How accurate is the system?", icon: Zap },
  { text: "Environmental impact data", icon: Leaf },
]

const botResponses = {
  "How does AI sorting work?":
    "Our AI uses computer vision and machine learning to identify different types of waste materials with 95%+ accuracy. The system analyzes shape, color, texture, and other visual features to classify items into appropriate recycling categories.",
  "What types of waste can be processed?":
    "We can process plastic bottles, aluminum cans, paper products, cardboard, glass containers, electronic waste, organic materials, and various other recyclable items. Our AI is continuously learning to identify new waste types.",
  "How accurate is the system?":
    "Our current system achieves 95.7% accuracy in waste classification. This high accuracy is maintained through continuous machine learning updates and real-world feedback from processing facilities.",
  "Environmental impact data":
    "Since launch, our system has helped process over 2.4M tons of waste, saved 156K trees, and reduced CO2 emissions by 89K tons. We're making a real difference in global sustainability efforts!",
  default:
    "I'm here to help with any questions about our AI-powered waste management system! Feel free to ask about our technology, environmental impact, or how to get started.",
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbot-messages")
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })))
      } catch (error) {
        console.error("Failed to load chat history:", error)
      }
    } else {
      // Welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        content: "👋 Hi! I'm your AI waste management assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot-messages", JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse = botResponses[content as keyof typeof botResponses] || botResponses.default
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)

        // Increment unread count if chat is closed
        if (!isOpen) {
          setUnreadCount((prev) => prev + 1)
        }
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem("chatbot-messages")
    const welcomeMessage: Message = {
      id: "welcome-new",
      content: "Chat cleared! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full glass-button shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          size="lg"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="h-6 w-6" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-red-500 text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96"
          >
            <Card className="glass-card border-0 shadow-2xl overflow-hidden">
              {/* Header */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="relative">
                      <Bot className="h-5 w-5 text-primary" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    AI Assistant
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0"
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearChat} className="h-8 w-8 p-0">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Ask me anything about waste management!</p>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="p-0">
                      {/* Messages */}
                      <ScrollArea className="h-80 px-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {message.sender === "bot" && (
                                    <Bot className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                                  )}
                                  {message.sender === "user" && (
                                    <User className="h-4 w-4 mt-0.5 text-primary-foreground flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
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
                            </motion.div>
                          ))}

                          {/* Typing Indicator */}
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <div className="bg-muted rounded-lg px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <Bot className="h-4 w-4 text-primary" />
                                  <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                    <div
                                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                      style={{ animationDelay: "0.1s" }}
                                    />
                                    <div
                                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                      style={{ animationDelay: "0.2s" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>

                      {/* Quick Questions */}
                      {messages.length <= 1 && (
                        <div className="px-4 py-3 border-t">
                          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {quickQuestions.map((question, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickQuestion(question.text)}
                                className="text-xs h-auto py-2 px-2 justify-start"
                              >
                                <question.icon className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{question.text}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Input */}
                      <div className="p-4 border-t">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            sendMessage(inputValue)
                          }}
                          className="flex gap-2"
                        >
                          <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1"
                            disabled={isTyping}
                          />
                          <Button type="submit" size="sm" disabled={!inputValue.trim() || isTyping} className="px-3">
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
