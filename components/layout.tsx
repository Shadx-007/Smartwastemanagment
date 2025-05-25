"use client"

import { useState } from "react"
import { TopNavbar } from "@/components/top-navbar"
import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { cn } from "@/lib/utils"
import { EnhancedFooter } from "@/components/enhanced-footer"

export function Layout({ children, showSidebars = true }) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <TopNavbar />
      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        {showSidebars && <LeftSidebar isOpen={isLeftSidebarOpen} setIsOpen={setIsLeftSidebarOpen} />}

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            showSidebars && isLeftSidebarOpen && "ml-64 md:ml-72",
            showSidebars && isRightSidebarOpen && "mr-64 md:mr-72",
          )}
        >
          {children}
        </main>

        {/* Right Sidebar */}
        {showSidebars && <RightSidebar isOpen={isRightSidebarOpen} setIsOpen={setIsRightSidebarOpen} />}
      </div>
      <EnhancedFooter />
    </div>
  )
}
