"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideArea from "@/components/common/SideArea";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/");
    }
  }, [router]);

  return (
    <SidebarProvider>
      <SiteHeader />
      <SidebarInset>
        <SideArea />
       <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
