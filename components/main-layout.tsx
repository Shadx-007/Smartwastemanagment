"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Leaf, Lightbulb, Settings, ChevronLeft, ChevronRight, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Chatbot } from "@/components/chatbot"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Eco Analysis", href: "/eco-analysis", icon: Leaf },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface MainLayoutProps {
  children: React.ReactNode
  showSidebars?: boolean
}

function LeftSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 border-r",
        "bg-background/95 backdrop-blur-xl",
        isDark ? "border-white/10" : "border-black/10",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border/50">
          <Button variant="ghost" size="icon" onClick={onToggle} className="w-full justify-center">
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                    pathname === item.href
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "hover:bg-muted/50",
                    !isOpen && "justify-center",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </motion.aside>
  )
}

function RightSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 z-40 border-l",
            "bg-background/95 backdrop-blur-xl",
            isDark ? "border-white/10" : "border-black/10",
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h3 className="font-semibold">Notifications</h3>
              <Button variant="ghost" size="icon" onClick={onToggle}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 p-4">
              <div className="space-y-4">
                {[
                  { title: "System Update", message: "New AI model deployed successfully", time: "2 min ago" },
                  { title: "Classification Alert", message: "95% accuracy achieved today", time: "1 hour ago" },
                  { title: "Eco Milestone", message: "1000 items recycled this week!", time: "3 hours ago" },
                ].map((notification, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-colors",
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                        : "bg-black/5 border-black/10 hover:bg-black/10",
                    )}
                  >
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export function MainLayout({ children, showSidebars = false }: MainLayoutProps) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {showSidebars && (
          <>
            <LeftSidebar isOpen={leftSidebarOpen} onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)} />

            {/* Notification Bell */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="fixed top-20 right-4 z-50 bg-background/95 backdrop-blur-xl"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </>
        )}

        <motion.main
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "flex-1 min-h-[calc(100vh-4rem)]",
            showSidebars && leftSidebarOpen ? "ml-[280px]" : showSidebars ? "ml-[60px]" : "",
            showSidebars && rightSidebarOpen ? "mr-[320px]" : "",
          )}
        >
          {children}
        </motion.main>

        {showSidebars && (
          <RightSidebar isOpen={rightSidebarOpen} onToggle={() => setRightSidebarOpen(!rightSidebarOpen)} />
        )}
      </div>

      <Chatbot />
    </div>
  )
}
