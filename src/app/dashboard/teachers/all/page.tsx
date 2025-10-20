
// app/teachers/view/page.tsx
"use client";

import { useState, useEffect } from "react";
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
import {  MoreHorizontal, Pencil, Trash2, Users } from "lucide-react";
import Link from "next/link";


type Teacher = {
  _id: string;
  name: string;
  subject: string;
  email: string;
  mobile: string;
  gender: string;
  qualification: string;
  [key: string]: string;
};

export default function ViewTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  
  useEffect(() => {
    try {
      fetch("http://localhost:3001/api/teachers")
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            setTeachers(data.data || [])
          } else if (data.status === "error") {
            console.log("error: ", data?.message)
          }
        })
    } catch (e) {
      console.log("/teachers/all/page.tsx: ", e);
    }
  }, []);


  return (
    <main className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            All Teachers
          </CardTitle>
          <div className="mt-2 sm:mt-0 flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Total: </span>
            <span className="font-semibold text-foreground">
              {teachers.length}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead className="hidden sm:table-cell">Gender</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Qualification
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {teachers.map((t, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>{index+1}</TableCell>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {t.email}
                    </TableCell>
                    <TableCell>{t.mobile}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {t.gender}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {t.qualification}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/teachers/update/${t._id}/edit`}>
                          <DropdownMenuItem
                            className="cursor-pointer"
                          >
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          </Link>

                          <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {teachers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground py-6"
                    >
                      No teachers found.
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
