"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Recycle, BarChart3, Zap, Users } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "AI Features", href: "/ai-features" },
  { name: "Model", href: "/model" },
  { name: "Pricing", href: "/pricing" },
  { name: "Demo", href: "/demo" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
]

const features = [
  { name: "AI Classification", href: "/features#ai", icon: Zap },
  { name: "Real-time Analytics", href: "/features#analytics", icon: BarChart3 },
  { name: "Waste Tracking", href: "/features#tracking", icon: Recycle },
  { name: "Team Management", href: "/features#team", icon: Users },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b glass-card backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Recycle className="h-8 w-8 text-primary group-hover:rotate-180 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              SmartWaste
            </span>
            <Badge variant="secondary" className="text-xs">
              AI
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitcher />
            <Button variant="outline" size="sm" className="glass-button" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="glass-button" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="glass-button">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full mb-2 glass-button" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="w-full glass-button" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
