"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Features",
    path: "/features",
  },
  {
    name: "AI Features",
    path: "/ai-features",
  },
  {
    name: "Model",
    path: "/model",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Demo",
    path: "/demo",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "About",
    path: "/about",
  },
]

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/20">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2">
          {children}
          <Link href="/" className="font-bold text-xl md:ml-2 text-foreground">
            Smart Waste
          </Link>
        </div>

        {/* Center Navigation - Evenly Spaced */}
        <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                  pathname === item.path ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right-aligned Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              const html = document.documentElement
              const isLight = html.classList.contains("light")
              if (isLight) {
                html.classList.remove("light")
                html.classList.add("dark")
                localStorage.setItem("theme", "dark")
              } else {
                html.classList.remove("dark")
                html.classList.add("light")
                localStorage.setItem("theme", "light")
              }
            }}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            <svg className="w-5 h-5 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg className="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-sm" asChild>
            <Link href="/signup">
              <UserIcon className="mr-2 h-4 w-4" />
              Sign Up
            </Link>
          </Button>
          <div className="hidden md:block ml-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
