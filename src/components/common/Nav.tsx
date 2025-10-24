"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Activity,
  Settings,
  HelpCircle,
  Search,
  User,
  LogOut,
} from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const isTeacherDashboard = pathname?.startsWith("/TeacherDashboard");


  const baseUser = { name: "Profile", email: "naim@gmail.com" };

  const adminNav = {
    user: baseUser,
    navMain: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Students", url: "/dashboard/students", icon: Users },
      { title: "Teachers", url: "/dashboard/teachers", icon: GraduationCap },
      { title: "Classes", url: "/dashboard/classes", icon: BookOpen },
      { title: "Exam", url: "/dashboard/exams", icon: BookOpen },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: Settings },
      { title: "Help", url: "#", icon: HelpCircle },
      { title: "Search", url: "#", icon: Search },
    ],
  };

  const teacherNav = {
    user: baseUser,
    navMain: [
      { title: "Dashboard", url: "/TeacherDashboard", icon: LayoutDashboard },
      { title: "Attendance", url: "/TeacherDashboard/attendance", icon: Activity },
      { title: "Student", url: "/TeacherDashboard/my-students", icon: Users },
      { title: "Class", url: "/TeacherDashboard/classes", icon: BookOpen },
      { title: "My Activity", url: "/TeacherDashboard/activity", icon: Activity },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: Settings },
      { title: "Help", url: "#", icon: HelpCircle },
      { title: "Search", url: "#", icon: Search },
    ],
  };

  const currentNav = isTeacherDashboard ? teacherNav : adminNav;

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  // handle log out 
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  }


  return (
    <nav className="2xl:px-20 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className=" mx-auto px-3 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={isTeacherDashboard ? "/TeacherDashboard" : "/dashboard"}
          className="text-2xl font-bold text-indigo-700"
        >
          Sunnyvale School
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Main Navigation */}
          <div className="flex space-x-6">
            {currentNav.navMain.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition ${
                    pathname === item.url ||  (pathname.startsWith(item.url + "/") && item.url !== "/dashboard") ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <User size={20} />
              <span className="font-medium">{currentNav.user.name}</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold text-gray-900">{currentNav.user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{currentNav.user.email}</p>
                </div>
                {currentNav.navSecondary.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={handleLinkClick}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Icon size={16} className="mr-3" />
                      {item.title}
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LogOut size={16} className="mr-3" />
                  Sign Outss
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center md:hidden space-x-4">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="text-gray-700 hover:text-indigo-600"
          >
            <User size={22} />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-indigo-600"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col px-4 py-3 space-y-1">
            {currentNav.navMain.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={handleLinkClick}
                  className={`flex items-center px-3 py-2 rounded-md hover:bg-indigo-50 transition ${
                    pathname === item.url
                      ? "text-indigo-600 bg-indigo-50 font-semibold"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.title}
                </Link>
              );
            })}

            <div className="border-t border-gray-200 my-2" />

            {currentNav.navSecondary.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={handleLinkClick}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition"
                >
                  <Icon size={18} className="mr-3" />
                  {item.title}
                </Link>
              );
            })}
            <button
              onClick={handleLinkClick}
              className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition text-left"
            >
              <LogOut size={18} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close menus */}
      {(menuOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => {
            setMenuOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </nav>
  );
}
