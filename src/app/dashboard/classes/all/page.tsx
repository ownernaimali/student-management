// app/classes/page.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

type ClassType = {
  id: number;
  name: string;
  section: string;
  teacher: string;
  room: string;
};

export default function ViewClassesPage() {
  const [classes, setClasses] = useState<ClassType[]>([
    {
      id: 1,
      name: "Class 1",
      section: "A",
      teacher: "Mr. John Doe",
      room: "101",
    },
    {
      id: 2,
      name: "Class 2",
      section: "B",
      teacher: "Ms. Sarah Lee",
      room: "202",
    },
  ]);

  const handleUpdate = (id: number) => {
    console.log("Update class:", id);
    // 👉 redirect to update page (e.g. /classes/update/[id])
  };

  const handleDelete = (id: number) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    console.log("Deleted class:", id);
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <Card className="px-0 my-6">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-bold">All Classes</CardTitle>
          <span className="text-sm text-muted-foreground">
            Total Classes: <span className="font-semibold">{classes.length}</span>
          </span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/50">
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.section}</TableCell>
                    <TableCell>{c.teacher}</TableCell>
                    <TableCell>{c.room}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUpdate(c.id)}
                            className="cursor-pointer"
                          >
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(c.id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {classes.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground py-6"
                    >
                      No classes found.
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
