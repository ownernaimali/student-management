"use client"
import {useState, useEffect} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function ClassesDashboard() {
const [classLength, setClassLength] = useState(0);

useEffect(() => {
	try {
		fetch("https://student-management-server-xwpm.onrender.com/api/totals/classes")
		.then(res => res.json())
		.then(data => setClassLength(data.total || 0))
		
	} catch (e) {
		console.log(e);
	}
},[]);

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Classes Dashboard</h2>
        <div className="flex gap-2">
          <Link href="/dashboard/classes/add"><Button>Add Class</Button></Link>
          <Link href="/dashboard/classes/update"><Button variant="outline">Update Class</Button></Link>
          <Link href="/dashboard/classes/all"><Button variant="outline">View All</Button></Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Class</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{classLength}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

