"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
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
       <main>{children}</main>
  );
}
