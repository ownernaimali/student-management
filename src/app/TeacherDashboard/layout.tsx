"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/common/Nav"

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function TeacherDashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "teacher") {
        router.push("/login"); 
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
	<section className="mt-20">{children}</section>
  </main>
  );
}
