"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, ChevronLeft, ChevronRight, Leaf, Lightbulb, Recycle, Settings } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Eco Analysis",
    href: "/eco-analysis",
    icon: Leaf,
  },
  {
    title: "Insights",
    href: "/insights",
    icon: Lightbulb,
  },
  {
    title: "Waste Management",
    href: "/waste",
    icon: Recycle,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function LeftSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname()

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
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "fixed left-0 z-40 h-full w-64 md:w-72 border-r bg-background/95 backdrop-blur-sm",
          "flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Smart Waste</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Button
                    asChild
                    variant={isActive ? "default" : "ghost"}
                    className={cn("w-full justify-start", isActive && "bg-primary/10 text-primary hover:bg-primary/20")}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.title}
                    </Link>
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t p-4">
          <Button variant="outline" size="icon" className="ml-auto" onClick={() => setIsOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      </motion.aside>

      {/* Toggle button (visible on mobile when sidebar is closed) */}
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-20 z-40 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      )}
    </>
  )
}
