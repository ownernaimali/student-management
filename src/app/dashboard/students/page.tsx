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
 
export default function StudentDashboardPage() {
const [utils, setUtils] = useState({});
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    const totalStudentsLength = async () => {
      try {
        const res = await fetch("https://student-management-server-xwpm.onrender.com/api/utils");
        if (!res.ok) {
          throw new Error("Failed to fetch total students");
        }
        const data = await res.json();        
        setUtils(data.data); 
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    totalStudentsLength();
  }, []);
  
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading student data...</p>
        </div>
      </div>
    )
  }

  return (
    <main className=" my-20 p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Student Manage Page</h2>
        <div className="flex gap-2">
          <Button><Link href="/dashboard/students/add">Add Student</Link></Button>
          <Button variant="outline"><Link href="/dashboard/students/update">Update Student</Link></Button>
          <Button variant="outline"><Link href="/dashboard/students/all">All</Link></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{utils?.overall?.totalStudents || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{utils?.overall?.totalPresent || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{utils?.overall?.totalAbsent || 0}</p>
          </CardContent>
        </Card>
              <Card>
          <CardHeader>
            <CardTitle>Attendanc Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-sky-600">{utils?.overall?.attendanceRate || 0}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

