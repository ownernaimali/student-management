import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SideArea from "@/components/common/SideArea";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function TeacherDashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = cookieStore.get("user")?.value;

  // Require both token and admin user
  if (!token || user !== "teacher") {
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
