"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface DashboardLayoutProps {
  children: ReactNode;
}

import Nav from "@/components/common/Nav";

export default function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
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
  <main>
	<Nav />
	<section className="mt-20 max-w-[1440px] mx-auto">{children}</section>
  </main>
  );
}
