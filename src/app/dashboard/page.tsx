"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCheck, UserX, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function AdminDashboard() {
  const stats = [
    {
      id: "totalStudents",
      title: "Total Students",
      description: "Across all classes",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "totalClass",
      title: "Total Classes",
      description: "Active courses",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "totalPresent",
      title: "Total Present",
      description: "Today's attendance",
      icon: UserCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      id: "totalAbsent",
      title: "Total Absent",
      description: "Today's attendance",
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: "attendanceRate",
      title: "Attendance Rate",
      description: "This day average",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  type utilsDataType = {
  overall: {
    date: string;
    totalClass: number;
    totalStudents: number;
    totalPresent: number;
    totalAbsent: number;
    attendanceRate: number;
  };
  classwise: Array<{
    classLevel?: string;
    students?: number;
    present?: number;
    absent?: number;
    attendanceRate?: number;
  }>;
};
  const [utilsData, setUtilsData] = useState<utilsDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Fetch real data from API if needed
      fetch("http://localhost:3001/api/utils")
      .then(res => res.json())
      .then(data => {
        if(data.status==="success") {
         setUtilsData(data.data); 
        }
      })
    } catch {
      Swal.fire("Error", "Server Error? Reload Page", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    // loading state animation
    return (
      <div className="p-6 flex items-center justify-center min-h-[95dvh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading student data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 px-2 mt-20 space-y-6 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-0">
          Welcome back! Here&#39;s an overview of your Teacher, classes and students.
        </p>
        <p className="text-muted-foreground mt-0 text-right">{new Date().toLocaleDateString('en-US', {weekday: 'long', day: 'numeric',  month: 'long', year: 'numeric'})}</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                  {(() => {
                    if (!utilsData) return "-";
                    switch (stat.id) {
                      case "totalStudents":
                        return utilsData.overall.totalStudents;
                      case "totalClass":
                        return utilsData.overall.totalClass;
                      case "totalPresent":
                        return utilsData.overall.totalPresent;
                      case "totalAbsent":
                        return utilsData.overall.totalAbsent;
                      case "attendanceRate":
                        return utilsData.overall.attendanceRate + "%";
                      default:
                        return "-";
                    }
                  })()}
                </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
        
      <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Classes
              </CardTitle>
              <div className={`p-2 rounded-lg bg-orange-50`}>
                <Calendar className={`h-4 w-4 text-orange-600`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Upcoming Classes
              </p>
            </CardContent>
          </Card>

        {/* {
        
        <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Classes
              </CardTitle>
              <div className={`p-2 rounded-lg bg-orange-50`}>
                <Calendar className={`h-4 w-4 text-orange-600`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Upcoming Classes
              </p>
            </CardContent>
          </Card>
        } */}
        
      </div>

      {/* Class-wise Statistics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Class Attendance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Class-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {utilsData?.classwise?.map((classStat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold">Class {classStat.classLevel} </h4>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span>Total: {classStat.students}</span>
                      <span className="text-emerald-600">Present: {classStat.present}</span>
                      <span className="text-red-600">Absent: {classStat.absent}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {classStat.attendanceRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-muted-foreground">Average Grade</div>
                </div>
                <div className="space-y-2 p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-muted-foreground">Assignments Due</div>
                </div>
                <div className="space-y-2 p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">5</div>
                  <div className="text-sm text-muted-foreground">Pending Tasks</div>
                </div>
                <div className="space-y-2 p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-muted-foreground">Student Engagement</div>
                </div>
              </div>
              
              {/* Attendance Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Attendance Rate</span>
                  <span>90.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: '90.1%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Goal: 95%</span>
                  <span>+2.1% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
