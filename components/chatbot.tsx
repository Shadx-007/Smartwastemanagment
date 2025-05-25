"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Smart Waste Assistant. How can I help you today?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you identify the correct bin for your waste items.",
        "Based on my analysis, this item should go in the recycling bin.",
        "Did you know that proper waste segregation can reduce landfill waste by up to 75%?",
        "I've analyzed your waste pattern and can suggest ways to reduce your environmental impact.",
        "Smart Waste's AI can identify over 1,000 different types of waste materials with 98% accuracy.",
      ]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
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
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-3 shadow-lg hover:shadow-xl"
          aria-label="Open chat"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 md:w-[450px]"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="flex h-[500px] flex-col overflow-hidden border-2 border-green-200/20 bg-card/95 backdrop-blur-sm dark:border-green-900/20">
              {/* Chat header */}
              <div className="flex items-center justify-between border-b bg-gradient-to-r from-green-500/10 to-emerald-600/10 p-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-600">
                    <Bot className="h-4 w-4 text-white" />
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-medium">Smart Waste Assistant</h3>
                    <p className="text-xs text-muted-foreground">AI-powered help</p>
                  </div>
                </div>
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

              {/* Chat messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4" ref={messagesEndRef}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg bg-muted p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
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
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
