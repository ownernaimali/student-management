"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideArea from "@/components/common/SideArea";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "teacher") {
        router.push("/"); 
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Checking access...
      </div>
    );
  }

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
