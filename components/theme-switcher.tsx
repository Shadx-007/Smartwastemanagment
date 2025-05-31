"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Palette, Sun, Moon, Waves, Sunset, TreePine, Monitor } from "lucide-react"

const themes = [
  {
    name: "light",
    label: "Light",
    icon: Sun,
    description: "Clean and bright interface",
    gradient: "from-blue-400 to-purple-500",
    preview: "bg-gradient-to-br from-blue-50 to-purple-50",
  },
  {
    name: "dark",
    label: "Dark",
    icon: Moon,
    description: "Easy on the eyes",
    gradient: "from-gray-700 to-gray-900",
    preview: "bg-gradient-to-br from-gray-800 to-gray-900",
  },
  {
    name: "ocean",
    label: "Ocean",
    icon: Waves,
    description: "Deep blue serenity",
    gradient: "from-blue-500 to-cyan-500",
    preview: "bg-gradient-to-br from-blue-400 to-cyan-400",
  },
  {
    name: "sunset",
    label: "Sunset",
    icon: Sunset,
    description: "Warm orange glow",
    gradient: "from-orange-500 to-red-500",
    preview: "bg-gradient-to-br from-orange-400 to-red-400",
  },
  {
    name: "forest",
    label: "Forest",
    icon: TreePine,
    description: "Natural green harmony",
    gradient: "from-green-500 to-emerald-500",
    preview: "bg-gradient-to-br from-green-400 to-emerald-400",
  },
  {
    name: "system",
    label: "System",
    icon: Monitor,
    description: "Follow system preference",
    gradient: "from-gray-500 to-slate-500",
    preview: "bg-gradient-to-br from-gray-400 to-slate-400",
  },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent SSR mismatch

  const currentTheme = themes.find((t) => t.name === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="glass-button relative overflow-hidden group">
          <CurrentIcon className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Theme</span>
          <Palette className="h-4 w-4 sm:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-0 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Palette className="h-5 w-5" />
            Choose Your Theme
          </DialogTitle>
          <DialogDescription>Select a theme that matches your style and preference</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon
            const isActive = theme === themeOption.name

            return (
              <Button
                key={themeOption.name}
                variant="outline"
                className={`
                  relative h-auto p-4 flex flex-col items-center gap-2 
                  glass-button group transition-all duration-300
                  ${isActive ? "ring-2 ring-primary glow-blue" : ""}
                `}
                onClick={() => {
                  setTheme(themeOption.name)
                  setOpen(false)
                }}
              >
                <div
                  className={`
                    w-12 h-8 rounded-md ${themeOption.preview} 
                    border border-white/20 shadow-inner
                    group-hover:scale-110 transition-transform duration-300
                  `}
                />
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{themeOption.label}</span>
                </div>
                {isActive && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
                <p className="text-xs text-muted-foreground text-center leading-tight">{themeOption.description}</p>
              </Button>
            )
          })}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Your theme preference is automatically saved and will persist across sessions.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
