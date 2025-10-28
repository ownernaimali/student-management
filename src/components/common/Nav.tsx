"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
   const router = useRouter(); 
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
      { title: "Exam", url: "/TeacherDashboard/exam", icon: BookOpen },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: Settings },
      { title: "Help", url: "#", icon: HelpCircle },
      { title: "Search", url: "#", icon: Search },
    ],
  };

  const currentNav = isTeacherDashboard ? teacherNav : adminNav;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // handle log out
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
    return;
  };


  return (
    <nav className="2xl:px-20 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto px-3 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={isTeacherDashboard ? "/TeacherDashboard" : "/dashboard"}
          className="text-2xl font-bold text-indigo-700"
        >
          Sunnyvale School
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Main Navigation */}
          <div className="flex space-x-6">
            {currentNav.navMain.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition ${
                    pathname === item.url ||
                    (pathname.startsWith(item.url + "/") &&
                      item.url !== "/dashboard" && item.url !== "/TeacherDashboard")
                      ? "text-indigo-600 font-semibold"
                      : ""
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
                  <p className="text-sm font-semibold text-gray-900">
                    {currentNav.user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {currentNav.user.email}
                  </p>
                </div>
                {currentNav.navSecondary.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                    className={`flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition ${
                    pathname === item.url ||
                    (pathname.startsWith(item.url + "/") &&
                      item.url !== "/dashboard" && item.url !== "/TeacherDashboard")
                      ? "text-indigo-600 font-semibold"
                      : ""
                  }`}
                    >
                      <Icon size={16} className="mr-3" />
                      {item.title}
                    </Link>
                  );
                })}
                <button
                    onClick={handleLogOut}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  <LogOut size={16} className="mr-3" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

   


        {/* Mobile Controls */}
          <button
          onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-indigo-600"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
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
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition ${
                    pathname === item.url ||
                    (pathname.startsWith(item.url + "/") &&
                      item.url !== "/dashboard" && item.url !== "/TeacherDashboard")
                      ? "text-indigo-600 font-semibold"
                      : ""
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
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition ${
                    pathname === item.url ||
                    (pathname.startsWith(item.url + "/") &&
                      item.url !== "/dashboard" && item.url !== "/TeacherDashboard")
                      ? "text-indigo-600 font-semibold"
                      : ""
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.title}
                </Link>
              );
            })}

            {/* ✅  mobile logout */}
            <button
                onClick={handleLogOut}
              className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition text-left"
            >
              <LogOut size={18} className="mr-3" />
              Log Out
            </button>
          </div>
        </div>

        )}

    
    </nav>
  );
}
