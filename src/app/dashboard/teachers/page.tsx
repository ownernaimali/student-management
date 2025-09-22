import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function TeacherDashboard() {
  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Teachers Dashboard</h2>
        <div className="flex gap-2">
          <Button><Link href="/dashboard/teachers/add">Add Teacher</Link></Button>
          <Button variant="outline">Update Teacher</Button>
          <Button variant="outline">View All</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">0</p>
          </CardContent>
        </Card>
      </div>

     
    </main>
  );
}

