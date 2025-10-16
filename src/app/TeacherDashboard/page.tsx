"use client"
import {useState, useEffect} from "react";

export default function TeacherDashboard() {
const [teacher, setTeacher] = useState({});

useEffect(() => {
	fetch("https://student-management-server-xwpm.onrender.com/api/teachers/token", {
	headers: {authorization: `Beare ${localStorage.getItem("token")}`}
	})
	.then(res => res.json())
	.then(data => {
		if(data.status=="success") {
			setTeacher(data.data)
			console.log(data.data)
		}
		console.log(data)
	})
	.catch(e => console.log(e))
},[]);

  return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Student Analysis Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {teacher.name} Here&#39;s your class overview.</p>
		</div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">84.5%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">92.3%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">24/28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Semester</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[65, 80, 45, 90, 75, 85, 70, 95, 60, 78, 82, 88].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                      style={{ height: `${value}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">W{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Student Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: 'Emma Johnson', grade: 94, attendance: 98, status: 'Excellent' },
                      { name: 'Michael Brown', grade: 87, attendance: 95, status: 'Good' },
                      { name: 'Sarah Wilson', grade: 92, attendance: 96, status: 'Excellent' },
                      { name: 'James Davis', grade: 78, attendance: 88, status: 'Average' },
                      { name: 'Lisa Miller', grade: 85, attendance: 92, status: 'Good' },
                    ].map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">Grade 10-A</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.grade}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.attendance}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                            student.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Attendance Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Attendance Distribution</h3>
              <div className="space-y-4">
                {[
                  { range: '90-100%', percentage: 65, color: 'bg-green-500' },
                  { range: '80-89%', percentage: 25, color: 'bg-blue-500' },
                  { range: '70-79%', percentage: 8, color: 'bg-yellow-500' },
                  { range: 'Below 70%', percentage: 2, color: 'bg-red-500' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.range}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Assignment submitted', student: 'Emma Johnson', time: '2 hours ago', type: 'submission' },
                  { action: 'Grade updated', student: 'Michael Brown', time: '4 hours ago', type: 'grade' },
                  { action: 'Attendance marked', student: 'Sarah Wilson', time: '1 day ago', type: 'attendance' },
                  { action: 'New assignment', student: 'All students', time: '2 days ago', type: 'assignment' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      activity.type === 'submission' ? 'bg-green-500' :
                      activity.type === 'grade' ? 'bg-blue-500' :
                      activity.type === 'attendance' ? 'bg-orange-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.student}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-sm font-medium transition-all transform hover:scale-105">
                  Add Grade
                </button>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-sm font-medium transition-all transform hover:scale-105">
                  Mark Attendance
                </button>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-sm font-medium transition-all transform hover:scale-105">
                  New Assignment
                </button>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-sm font-medium transition-all transform hover:scale-105">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
/*
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&#39;s an overview of your classes and students.
        </p>
      </div>

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

      <div className="grid gap-6 lg:grid-cols-2">
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
*/
