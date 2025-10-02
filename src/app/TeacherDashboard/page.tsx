import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCheck, UserX, TrendingUp, Calendar } from "lucide-react";

export default function TeacherDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "142",
      description: "Across all classes",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total My Classes",
      value: "8",
      description: "Active courses",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Present",
      value: "128",
      description: "Today's attendance",
      icon: UserCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Total Absent",
      value: "14",
      description: "Today's attendance",
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Attendance Rate",
      value: "90.1%",
      description: "This week average",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Upcoming Classes",
      value: "3",
      description: "Today's schedule",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const classStats = [
    { name: "Mathematics", students: 28, present: 25, absent: 3 },
    { name: "Science", students: 32, present: 30, absent: 2 },
    { name: "English", students: 26, present: 24, absent: 2 },
    { name: "History", students: 24, present: 22, absent: 2 },
    { name: "Physics", students: 30, present: 27, absent: 3 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&#39;s an overview of your classes and students.
        </p>
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
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
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
              {classStats.map((classStat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{classStat.name}</h4>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span>Total: {classStat.students}</span>
                      <span className="text-emerald-600">Present: {classStat.present}</span>
                      <span className="text-red-600">Absent: {classStat.absent}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {Math.round((classStat.present / classStat.students) * 100)}%
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
