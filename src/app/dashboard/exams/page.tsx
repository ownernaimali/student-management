"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import {useState, useEffect} from "react"
 
export default function ExamDashboardPage() {
 const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
 useEffect(() => {
  try {
    fetch("https://student-management-server-xwpm.onrender.com/api/totals/exams")
    .then(res => res.json())
    .then(data => {
      if(data.status==="success") {
        setTotal(data.total);
      }
    })
  } catch (e) {
    console.log("fetch exam total error: ", e);
  } finally {
    setLoading(false);
  }
 }, []);


  if (loading) {
    // loading state animation
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading exam  data...</p>
        </div>
      </div>
    )
  }

  return (
  <>
    <main className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Exam Dashboard</h2>
        <div className="flex gap-2">
          <Button><Link href="/dashboard/exam/add">Add Exam</Link></Button>
          <Button variant="outline"><Link href="/dashboard/exam/update">Update Exam</Link></Button>
          <Button variant="outline"><Link href="/dashboard/exam/all">All</Link></Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>



      </div>
    </main>
</>
  );
}

