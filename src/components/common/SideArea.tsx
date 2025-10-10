"use client";
import { usePathname } from "next/navigation";
import {
  IconDashboard,
  IconSchool,
  IconChalkboard,
  IconBook,
  IconActivity,
  IconSettings,
  IconHelp,
  IconSearch,
} from "@tabler/icons-react";

export default function SideArea() {
  const pathname = usePathname();
  const isTeacherDashboard = pathname?.startsWith("/TeacherDashboard");

  const baseUser = {
    name: "Naim",
    email: "naim@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const studentNav = {
    user: baseUser,
    navMain: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Students", url: "/dashboard/students", icon: IconSchool },
      { title: "Teachers", url: "/dashboard/teachers", icon: IconChalkboard },
      { title: "Classes", url: "/dashboard/classes", icon: IconBook },
      { title: "Exam", url: "/dashboard/exam", icon: IconBook },
      { title: "Activity", url: "/dashboard/activity", icon: IconActivity },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: IconSettings },
      { title: "Get Help", url: "#", icon: IconHelp },
      { title: "Search", url: "#", icon: IconSearch },
    ],
  };

  const teacherNav = {
    user: baseUser,
    navMain: [
      { title: "Dashboard", url: "/TeacherDashboard", icon: IconDashboard },
      { title: "Attendence", url: "/TeacherDashboard/attendance", icon: IconDashboard },
      { title: "My Students", url: "/TeacherDashboard/my-students", icon: IconSchool },
      { title: "My Classes", url: "/TeacherDashboard/classes", icon: IconBook },
      { title: "My Activity", url: "/TeacherDashboard/activity", icon: IconActivity },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: IconSettings },
      { title: "Help", url: "#", icon: IconHelp },
      { title: "Search", url: "#", icon: IconSearch },
    ],
  };

  const data = isTeacherDashboard ? teacherNav : studentNav;

  return <p>nav bar</p>
}
