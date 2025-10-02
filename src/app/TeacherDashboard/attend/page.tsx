"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, UserCheck, UserX, Users } from "lucide-react";
import { useState, useEffect } from "react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  email?: string;
  phone?: string;
}

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late';
  date: string;
}

export default function StudentAttendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendance, setAttendance] = useState<{ [key: string]: 'present' | 'absent' | 'late' }>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        
        // Filter students by class name "1"
        const classOneStudents = data.filter((student: Student) => 
          student.className === "1" || student.className === "Class 1" || student.className === "1st"
        );
        
        setStudents(classOneStudents);
        setFilteredStudents(classOneStudents);
        
        // Initialize all students as present by default
        const initialAttendance: { [key: string]: 'present' | 'absent' | 'late' } = {};
        classOneStudents.forEach((student: Student) => {
          initialAttendance[student.id] = 'present';
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error('Error fetching students:', error);
        // Fallback mock data for demonstration
        const mockStudents: Student[] = [
          { id: '1', name: 'John Doe', rollNumber: '001', className: '1' },
          { id: '2', name: 'Jane Smith', rollNumber: '002', className: '1' },
          { id: '3', name: 'Mike Johnson', rollNumber: '003', className: '1' },
          { id: '4', name: 'Sarah Wilson', rollNumber: '004', className: '1' },
          { id: '5', name: 'David Brown', rollNumber: '005', className: '1' },
          { id: '6', name: 'Emma Davis', rollNumber: '006', className: '1' },
        ];
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        const initialAttendance: { [key: string]: 'present' | 'absent' | 'late' } = {};
        mockStudents.forEach(student => {
          initialAttendance[student.id] = 'present';
        });
        setAttendance(initialAttendance);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAllAsPresent = () => {
    const newAttendance: { [key: string]: 'present' | 'absent' | 'late' } = {};
    students.forEach(student => {
      newAttendance[student.id] = 'present';
    });
    setAttendance(newAttendance);
  };

  const markAllAsAbsent = () => {
    const newAttendance: { [key: string]: 'present' | 'absent' | 'late' } = {};
    students.forEach(student => {
      newAttendance[student.id] = 'absent';
    });
    setAttendance(newAttendance);
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = {
        date: selectedDate,
        records: Object.entries(attendance).map(([studentId, status]) => ({
          studentId,
          status,
          date: selectedDate
        }))
      };

      // Send attendance data to API
      const response = await fetch('http://localhost:3001/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
      });

      if (response.ok) {
        alert('Attendance submitted successfully!');
      } else {
        throw new Error('Failed to submit attendance');
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Error submitting attendance. Please try again.');
    }
  };

  const getAttendanceStats = () => {
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    return { present, absent, late, total: students.length };
  };

  const stats = getAttendanceStats();

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
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Student Attendance</h1>
          <p className="text-muted-foreground">
            Class 1 - Manage student attendance for {selectedDate}
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

      {/* Attendance Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Class 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}% of class
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0}% of class
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <UserCheck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
            <p className="text-xs text-muted-foreground">Arrived late</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsPresent}>
                Mark All Present
              </Button>
              <Button variant="outline" size="sm" onClick={markAllAsAbsent}>
                Mark All Absent
              </Button>
              <Button size="sm" onClick={submitAttendance}>
                Submit Attendance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Class 1 Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No students found matching your search.
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Roll No: {student.rollNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Present
                    </Button>
                    <Button
                      variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, 'late')}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Late
                    </Button>
                    <Button
                      variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
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
