"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Plus, Mail, Phone, MoreVertical, Download } from "lucide-react";
import { useState, useEffect } from "react";


export default function MyStudents() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const d = [
          {
            id: '1',
            name: 'John Doe',
            rollNumber: '001',
            className: '1',
            email: 'john.doe@school.com',
            phone: '+1 234 567 8900',
            attendance: 95,
            grade: 'A',
            parentName: 'Robert Doe',
            parentPhone: '+1 234 567 8901',
            status: 'active'
          },
          {
            id: '2',
            name: 'Jane Smith',
            rollNumber: '002',
            className: '1',
            email: 'jane.smith@school.com',
            phone: '+1 234 567 8902',
            attendance: 88,
            grade: 'B+',
            parentName: 'Mary Smith',
            parentPhone: '+1 234 567 8903',
            status: 'active'
          },
          {
            id: '3',
            name: 'Mike Johnson',
            rollNumber: '003',
            className: '2',
            email: 'mike.johnson@school.com',
            phone: '+1 234 567 8904',
            attendance: 92,
            grade: 'A-',
            parentName: 'David Johnson',
            parentPhone: '+1 234 567 8905',
            status: 'active'
          },
          {
            id: '4',
            name: 'Sarah Wilson',
            rollNumber: '004',
            className: '1',
            email: 'sarah.wilson@school.com',
            phone: '+1 234 567 8906',
            attendance: 78,
            grade: 'C+',
            parentName: 'Lisa Wilson',
            parentPhone: '+1 234 567 8907',
            status: 'active'
          },
          {
            id: '5',
            name: 'David Brown',
            rollNumber: '005',
            className: '3',
            email: 'david.brown@school.com',
            phone: '+1 234 567 8908',
            attendance: 96,
            grade: 'A',
            parentName: 'James Brown',
            parentPhone: '+1 234 567 8909',
            status: 'active'
          },
          {
            id: '6',
            name: 'Emma Davis',
            rollNumber: '006',
            className: '1',
            email: 'emma.davis@school.com',
            phone: '+1 234 567 8910',
            attendance: 85,
            grade: 'B',
            parentName: 'Patricia Davis',
            parentPhone: '+1 234 567 8911',
            status: 'inactive'
          }
        ]
        setStudents(d);
        setFilteredStudents(d);
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term and filters
  useEffect(() => {
    let filtered = students;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Class filter
    if (selectedClass !== "all") {
      filtered = filtered.filter(student => student.className === selectedClass);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    setFilteredStudents(filtered);
  }, [searchTerm, selectedClass, selectedStatus, students]);

  const getClassOptions = () => {
    const classes = [...new Set(students.map(student => student.className))];
    return classes.sort();
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 75) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return "text-green-600 bg-green-50";
    if (grade.includes('B')) return "text-blue-600 bg-blue-50";
    if (grade.includes('C')) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

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
          <h1 className="text-3xl font-bold tracking-tight">My Students</h1>
          <p className="text-muted-foreground">
            Manage and view all your students' information
          </p>
        </div>
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
              {students.length > 0 
                ? Math.round(students.reduce((acc, student) => acc + student.attendance, 0) / students.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Overall rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {getClassOptions().length}
            </div>
            <p className="text-xs text-muted-foreground">Different classes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="h-10 px-3 py-2 border rounded-md text-sm bg-background"
              >
                <option value="all">All Classes</option>
                {getClassOptions().map(className => (
                  <option key={className} value={className}>Class {className}</option>
                ))}
              </select>

              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-10 px-3 py-2 border rounded-md text-sm bg-background"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-muted-foreground">
             {/* <Users className="h-12 w-12 mx-auto mb-4 opacity-50" /> */}
              <h3 className="text-lg font-semibold">No students found</h3>
              <p className="mt-2">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="overflow-hidden">
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
                        Roll No: {student.rollNumber}
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
                    <Badge variant="outline">Class {student.className}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span>{student.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phone</span>
                    <span>{student.phone}</span>
                  </div>
                </div>

                {/* Academic Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getAttendanceColor(student.attendance)}`}>
                      {student.attendance}%
                    </div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold px-2 py-1 rounded ${getGradeColor(student.grade)}`}>
                      {student.grade}
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
                      <span>{student.parentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{student.parentPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
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
