
// app/teachers/view/page.tsx
"use client";

import { useState } from "react";
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
import { MoreHorizontal, Pencil, Trash2, Users } from "lucide-react";

type Teacher = {
  id: number;
  name: string;
  subject: string;
  email: string;
  mobile: string;
  gender: string;
  qualification: string;
};

export default function ViewTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: "Mr. John Doe",
      subject: "Mathematics",
      email: "john.doe@example.com",
      mobile: "1234567890",
      gender: "Male",
      qualification: "M.Sc. Mathematics",
    },
    {
      id: 2,
      name: "Ms. Sarah Lee",
      subject: "English",
      email: "sarah.lee@example.com",
      mobile: "9876543210",
      gender: "Female",
      qualification: "M.A. English",
    },
  ]);

  const handleUpdate = (id: number) => {
    alert(`Update teacher with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

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
                {teachers.map((t) => (
                  <TableRow key={t.id} className="hover:bg-muted/50">
                    <TableCell>{t.id}</TableCell>
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
                          <DropdownMenuItem
                            onClick={() => handleUpdate(t.id)}
                            className="cursor-pointer"
                          >
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(t.id)}
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
