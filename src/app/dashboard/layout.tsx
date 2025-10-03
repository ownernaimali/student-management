import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import SideArea from "@/components/common/SideArea";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: DashboardLayoutProps) {

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // Require both token and admin user
  if (!token || user !== "admin") {
    redirect("/");
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <SideArea />
      <SidebarInset>
        <SiteHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
