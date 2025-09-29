"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"
import { useState, useEffect } from "react"

// Sample data for classes 1–10
const attendanceByClass = [
  { className: "Class 1", present: 25, absent: 3 },
  { className: "Class 2", present: 28, absent: 1 },
  { className: "Class 3", present: 26, absent: 2 },
  { className: "Class 4", present: 22, absent: 5 },
  { className: "Class 5", present: 30, absent: 0 },
  { className: "Class 6", present: 27, absent: 2 },
  { className: "Class 7", present: 29, absent: 1 },
  { className: "Class 8", present: 24, absent: 4 },
  { className: "Class 9", present: 23, absent: 3 },
  { className: "Class 10", present: 28, absent: 2 },
];
 
export default function StudentDashboardPage() {
const [totalStudents, setTotalStudents] = useState<number>(0);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const totalStudentsLength = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/totals/students");
        if (!res.ok) {
          throw new Error("Failed to fetch total students");
        }
        const data = await res.json();        
        setTotalStudents(data.total); 
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        // setLoading(false);
      }
    };

    totalStudentsLength();
  }, []);
// Calculate totals
const totalPresent = attendanceByClass.reduce((sum, cls) => sum + cls.present, 0);
const totalAbsent = attendanceByClass.reduce((sum, cls) => sum + cls.absent, 0);

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
        <div className="flex gap-2">
          <Button><Link href="/dashboard/students/add">Add Student</Link></Button>
          <Button variant="outline"><Link href="/dashboard/students/update">Update Student</Link></Button>
          <Button variant="outline"><Link href="/dashboard/students/all">All</Link></Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalStudents}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{totalPresent}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{totalAbsent}</p>
          </CardContent>
        </Card>
      </div>

      {/* Class-wise Attendance */}
      <h3 className="text-xl font-semibold">Class-wise Attendance</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {attendanceByClass.map((cls) => (
          <Card key={cls.className}>
            <CardHeader>
              <CardTitle>{cls.className}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Present:</span>
                <Badge className="bg-green-500 text-white">{cls.present}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Absent:</span>
                <Badge variant="destructive">{cls.absent}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

