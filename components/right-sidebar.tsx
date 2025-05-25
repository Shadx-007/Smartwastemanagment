"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Chatbot } from "@/components/chatbot"
import { Bell, ChevronLeft, X } from "lucide-react"

export function RightSidebar({ isOpen, setIsOpen }) {
  const [activeTab, setActiveTab] = useState("notifications")

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: 320 }}
        animate={{ x: isOpen ? 0 : 320 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "fixed right-0 z-40 h-full w-64 md:w-72 border-l bg-background/95 backdrop-blur-sm",
          "flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === "notifications" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("notifications")}
              className="h-8"
            >
              <Bell className="mr-1 h-4 w-4" />
              Notifications
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <h3 className="font-medium">New Insight Available</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your waste reduction metrics have improved by 15% this month.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">2 minutes ago</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  <h3 className="font-medium">System Update</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  New AI classification model has been deployed with 99.2% accuracy.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">1 hour ago</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <h3 className="font-medium">Maintenance Alert</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Scheduled maintenance will occur tomorrow at 2 AM UTC.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
          )}
        </div>

        {/* Chatbot at the bottom */}
        <div className="border-t p-4">
          <Chatbot />
        </div>
      </motion.aside>

      {/* Toggle button (visible on mobile when sidebar is closed) */}
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          className="fixed right-4 top-20 z-40 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      )}
    </>
  )
}
