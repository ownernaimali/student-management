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
import { Button } from "@/components/ui/button";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link"

type Student = {
  _id: string;
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  mobile: string;
  gender: string;
  classLevel: string;
  previousSchool: string;
  address: string;
  otherInfo: string;
};

export default function ViewStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://student-management-server-xwpm.onrender.com/api/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        if(data.status == 'success') {
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

  return (
    <main className="max-w-7xl mx-auto">
      <Card className="px-0 my-6">
        <CardHeader>
          <CardTitle className="text-lg font-bold">All Students</CardTitle>
          <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
            <span>
              Total:{" "}
              <span className="font-semibold">{students.length}</span>
            </span>
            {/* later: add present/absent counts */}
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
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={12}
                      className="text-center py-6 text-muted-foreground"
                    >
                      Loading students...
                    </TableCell>
                  </TableRow>
                ) : students.length > 0 ? (
                  students.map((s, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell>{index+1}</TableCell>
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
                            <Link href={`/dashboard/students/delete/${s._id}/`}>
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={12}
                      className="text-center text-muted-foreground py-6"
                    >
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
