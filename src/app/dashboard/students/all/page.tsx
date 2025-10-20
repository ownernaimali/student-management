"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2"
import {  MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"
type AttendanceRecord = {
	date: string;
	status: string;
}

type Student = {
  _id?: string;
  name: string;
  fatherName: string;
  motherName: string;
  birthSerial: string;
  dob: string;
  mobile: string;
  parentMobile: string;
  gender: string;
  classLevel: string;
  address: string;
  otherInfo: string;
  attendanceHistory: AttendanceRecord[];
};



export default function ViewStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        if(data.status === 'success') {
          setStudents(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Group students by class level
const studentsByClass = students.reduce((acc, s) => {
  if (!acc[s.classLevel]) acc[s.classLevel] = [];
  acc[s.classLevel].push(s);
  return acc;
}, {});

const handleDelete = (id) => {
	fetch(`http://localhost:3001/api/students/id/${id}`, {
		method: "DELETE",
	})
	.then(res => res.json())
	.then(data => {
	console.log(data);
		if(data.status==="success") {
			Swal.fire("Successfull", "Delete Student", "success")
		}
	})
}
  
  return (
    <main className="max-w-7xl mx-auto">
    <div className="text-lg font-bold my-4">
    Total Students: <span className="text-blue-600">{students.length}</span>
  </div>
      {loading ? (
        <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading students...</p>
        </div>
      </div>
      ) : (
        Object.entries(studentsByClass).map(([classLevel, classStudents]) => (
          <Card key={classLevel} className="px-0 my-[20px]">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Class {classLevel}</CardTitle>
              <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                <span>Total: <span className="font-semibold">{classStudents.length}</span></span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>DOB</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStudents.length > 0 ? (
                      classStudents.map((s, index) => (
                        <TableRow key={s._id} className="hover:bg-muted/50">
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{s.name}</TableCell>
                          <TableCell>{s.dob}</TableCell>
                          <TableCell>{s.classLevel}</TableCell>
                          <TableCell>{s.gender}</TableCell>
                          <TableCell>{s.mobile}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Link href={`/dashboard/students/update/${s._id}/edit`}>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Pencil className="w-4 h-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                </Link>
								<p onClick={() => handleDelete(s._id)}>
                                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                  
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                  </p>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No students found in Class {classLevel}.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}
