"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Recycle, Menu, X } from "lucide-react"

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "AI Features",
    href: "/ai-features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
]

export function TopNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-all duration-200",
        isScrolled && "h-16 shadow-md",
        !isScrolled && "h-20",
      )}
    >
      <div className="container flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Recycle className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Smart Waste</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === item.href}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          <div className="hidden md:flex md:items-center md:gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t"
        >
          <nav className="container py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 font-medium",
                      pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-foreground",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
