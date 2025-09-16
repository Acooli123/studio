"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bot, FilePlus2, LayoutDashboard, Settings, Ticket, Users } from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/tickets", label: "All Tickets", icon: Ticket },
    { href: "/dashboard/new-ticket", label: "Raise Ticket", icon: FilePlus2 },
    { href: "/support-chat", label: "Support Chatbot", icon: Bot },
    { href: "/dashboard/agent-workload", label: "Agent Workload", icon: BarChart3 },
    { href: "/dashboard/admin", label: "Admin", icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
            <Ticket className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">ServiceDesk AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                as={Link}
                href={item.href}
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="bg-muted rounded-lg p-4 space-y-2 text-center">
          <h4 className="font-semibold">Need Help?</h4>
          <p className="text-sm text-muted-foreground">
            Visit our help center or contact support.
          </p>
          <Button size="sm" className="w-full">Help Center</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
