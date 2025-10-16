"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import {useEffect, useState} from "react";

export default function MyStudents() {

  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState([]);
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [studentInfo, setStudentInfo] = useState({});

useEffect(() => {
    fetch("http://localhost:3001/api/teachers/token", {
    headers: {authorization: `Beare ${localStorage.getItem("token")}`}
    })
    .then(res => res.json())
    .then(data => {
        if(data.status=="success") {
			setTeacher(data.data);			
        }
    })
    .catch(e => console.log(e))
}, []);

useEffect(() => {
    fetch("http://localhost:3001/api/classes")
    .then(res => res.json())
    .then(data => {
		if(data.status==="success") {
		if(teacher._id) {
			const filter = data?.data?.filter(cls => cls.firstTeacherId === teacher._id)
			setClassInfo(filter);
		}
		}
    })

},[teacher]);



  // Fetch students from API
  useEffect(() => {
const fetchStudents = async () => {

    fetch("http://localhost:3001/api/utils")
    .then(res => res.json())
    .then(data => {
        if(data.status ==="success") {
		if(classInfo[0]?.classLevel) {
			const findData = data.data?.classwise?.find(s => s.classLevel === classInfo[0].classLevel)
			setStudentInfo(findData);

		}
    }

    })
    .catch(e => console.log(e))
  
      try {
      if(classInfo[0].classLevel) {
        const response = await fetch(`https://student-management-server-xwpm.onrender.com/api/students/class/${classInfo[0].classLevel}`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data.data);
        console.log(data.data);
        }
      } catch (e) {
         if (typeof e === "object" && e !== null && "status" in e) {
      const err = e as { status: string; message: string };
        Swal.fire("Error", err?.message || "Unknown Error. try again", "error") 
         }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classInfo]);


if(loading) {
	return <p className="text-center mt-20">loading...</p>
}

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Students</h1>
          <p className="text-muted-foreground">
            Manage and view all your students information
          </p>
        </div>
        {/*
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
   
		*/}
	</div>
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {studentInfo.attendanceRate} %
            </div>
            <p className="text-xs text-muted-foreground">Overall rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex justify-between w-full"><p>Present</p> <p>Absent</p></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 flex gap-2 justify-between">
              <p className="border rounded-full px-2 text-center">{ studentInfo.present}</p> <p className="border rounded-full px-2 text-center"> {studentInfo.absent}</p>
            </div>
            <p className="text-xs text-muted-foreground">This class</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {students.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-muted-foreground">
             {/* <Users className="h-12 w-12 mx-auto mb-4 opacity-50" /> */}
              <h3 className="text-lg font-semibold">No students found</h3>
              <p className="mt-2">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          students.map((student) => (
            <Card key={student._id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/avatars/${student.id}.jpg`} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {/* roll number*/}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Class</span>
                    <Badge variant="outline">Class {student.classLevel}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phone</span>
                    <span>{student.mobile}</span>
                  </div>
                </div>

                {/* Academic Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className={`text-lg font-semibold `}>
                      {1 || student.attendance}%
                    </div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold px-2 py-1 rounded`}>
                      {"A" || student.grade}
                    </div>
                    <div className="text-xs text-muted-foreground">Grade</div>
                  </div>
                </div>

                {/* Parent Info */}
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Parent Information</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span>{student.fatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{student.parentMobile}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4">
                  <Button variant="outline" size="sm" className="px-3">
                    Full Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
