"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, UserCheck, UserX, Users } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";



interface AttendanceRecord {
  attendDate: string;
  status: string;
}

interface Student {
  _id: string;
  name: string;
  className: string;
  attendanceHistory: AttendanceRecord[];
  [key: string]: unknown;
}



export default function StudentAttendance() {

  const [classInfo, setClassInfo] = useState([]);
  const nowDate = new Date().toISOString().split("T")[0];
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [teacher, setTeacher] = useState({});

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

      try {
      if(classInfo[0].classLevel) {
        const response = await fetch(`http://localhost:3001/api/students/class/${classInfo[0].classLevel}`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data.data);
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

const handleAttendance = (id: string, status: string) => {

try {
fetch(`http://localhost:3001/api/students/attendance/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status }),
})
.then(res => res.json())
.then(data => {
if(data.status==="success") {
const statusText = status.charAt(0).toUpperCase() + status.slice(1);
  setAttendance({ ...attendance, [id]: status });
  Swal.fire(statusText, `Student mark as ${status}`, "success")
} else {
  Swal.fire("Error", data?.message || "Unknown Error. try again", "error")
}

});
} catch (e) {
	console.log(e);
}
}


  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-1 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Student Attendance</h1>
          <p className="text-muted-foreground">
            Class {classInfo[0]?.classLevel} - Manage student attendance for {selectedDate}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>


      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Class {classInfo[0]?.classLevel} & Total Students {students.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No students found matching your search.
              </div>
            ) : (
              students.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        NC
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Roll No: {index+1}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                    disabled={
                      attendance[student._id] === "present" ||
                      student.attendanceHistory.some(
                          (record: { attendDate: string; status: string; }) =>
                            record.attendDate === nowDate && record.status === "present"
                        )
                    }
                      size="sm"
                      onClick={() => {
                      handleAttendance(student._id, "present")

                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    > 
                      Present
                    </Button>
                    <Button
                    disabled={attendance[student._id] === "absent" || student.attendanceHistory.some(
                          (record: { attendDate: string; status: string; }) =>
                            record.attendDate === nowDate && record.status === "absent"
                        ) }
                    onClick={() => {
                    handleAttendance(student._id, "absent")
                    }}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Absent
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
