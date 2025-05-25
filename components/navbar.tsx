"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { UserIcon } from "lucide-react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "AI Features", path: "/ai-features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Demo", path: "/demo" },
  { name: "Model", path: "/model" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
]

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/20">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {children}
          <Link href="/" className="font-cinzel text-xl font-bold md:ml-2">
            Smart Waste
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "font-outfit text-sm font-medium transition-colors hover:text-primary",
                pathname === item.path ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="font-outfit" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button size="sm" className="font-outfit" asChild>
              <Link href="/signup">
                <UserIcon className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
