"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart3, Layers, Recycle, Info, Settings, Globe, Plus, Users, FileText, LifeBuoy } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

const mainNavItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Demo", path: "/demo", icon: Recycle },
  { name: "Model", path: "/model", icon: Layers },
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "About", path: "/about", icon: Info },
]

const resourcesNavItems = [
  { name: "Documentation", path: "#", icon: FileText },
  { name: "Help & Support", path: "#", icon: LifeBuoy },
  { name: "Community", path: "#", icon: Users },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-cinzel font-bold">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-lg">Smart Waste</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.name}>
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild tooltip={item.name}>
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Button className="w-full justify-start" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
