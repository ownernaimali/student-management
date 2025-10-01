"use client"
// use client use for nav bar icon
// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: ReactNode;
}

const data = {
  user: {
    name: "naim",
    email: "naim@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/TeacherDashboard/",
      icon: IconDashboard,
    },
    {
      title: "My Students",
      url: "/TeacherDashboard/students",
      icon: IconListDetails,
    },
    {
      title: "My Classes",
      url: "/TeacherDashboard/classes",
      icon: IconFolder,
    },
    {
      title: "My Activity",
      url: "/TeacherDashboard/myactivity",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <div>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar data={data} variant="inset" />
      <SidebarInset>
        <SiteHeader />
      <main>{children}</main>
      
      </SidebarInset>
    </SidebarProvider>
      
    </div>
  );
}
