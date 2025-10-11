"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {  MoreHorizontal, Pencil, Trash2, Users } from "lucide-react";
import Link from "next/link";



export default function ViewExamPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/exams")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setExams(data.data);
          console.log(data.data);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  // Convert 24h to 12h AM/PM
  const formatTime = (time24) => {
    if (!time24) return "";
    const [h, m] = time24.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${m} ${ampm}`;
  };



  return (
    <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl sm:text-2xl font-bold">
            All Exams
          </p>
          <div className="mt-2 sm:mt-0 flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Total: </span>
            <span className="font-semibold text-foreground">
              {exams.length}
            </span>
          </div>
         </div>
         
         {/*  table */}
         
        <div>
			{
				exams.map((examData, idx) => (
				<Card className="mb-6" key={idx}>
				  <CardHeader>
					<CardTitle>Class Level: {examData?.classLevel}</CardTitle>
					<CardDescription>Exam data views</CardDescription>
					<CardAction><Button variant="outline">Edit</Button></CardAction>
				  </CardHeader>
				  <CardContent>
				   <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL</TableHead>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Object.entries(examData.exams)?.map(([subject, value], idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell>{idx+1}</TableCell>
                    <TableCell className="font-medium">Class {examData.classLevel}</TableCell>
                    <TableCell className="font-medium">{subject}</TableCell>
                    <TableCell className="font-medium">{value?.date || 0}</TableCell>
                    <TableCell className="font-medium">{formatTime(value.examStartTime) || 0}</TableCell>
                    <TableCell className="font-medium">{formatTime(value.examEndTime) || 0}</TableCell>
                    <TableCell className="font-medium">{value?.duration || 0}</TableCell>
                    <TableCell className="font-medium">{value?.marks || 0}</TableCell>
                                       <TableCell className="font-medium">{value.status}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/exams/update/${exams._id}/edit`}>
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

                {exams.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground py-6"
                    >
                      No Exams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
				  </CardContent>

				</Card>
				
				))
			}
        </div>    
    </main>
  );
}

