"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Swal from "sweetalert2";

type AttendanceRecord = {
date: string;
status: "present" | "absent" | string;
}
type Student = {
  _id: string;
  classLevel?: string;
  name?: string;
  fatherName?: string;
  motherName?: string;
  birthSerial?: string;
  dob?: string;
  mobile?: string;
  parentMobile?: string;
  gender?: string;
  previousSchool?: string;
  address?: string;
  otherInfo?: string;
  attendanceHistory?: AttendanceRecord[];
  [key: string]: unknown;
};

type MyClass = {
  _id: string;
  classLevel: string;
};

export default function UpdateStudentPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student>({
    _id: "",
    classLevel: "",
    name: "",
    fatherName: "",
    motherName: "",
    birthSerial: "",
    dob: "",
    mobile: "",
    parentMobile: "",
    gender: "",
    previousSchool: "",
    address: "",
    otherInfo: "",
    attendanceHistory: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState<MyClass[]>([]);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Fetch classes and student data
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch classes
        const classRes = await fetch("https://student-management-server-xwpm.onrender.com/api/classes");
        const classData = await classRes.json();
        if (classRes.ok) {
          setClassInfo(classData.data);
        }

        // Fetch student
        const studentRes = await fetch(`https://student-management-server-xwpm.onrender.com/api/students/${id}`);
        const studentData = await studentRes.json();
        
        if (studentRes.ok) {
          setStudent(studentData.data);
        } else {
          Swal.fire("Error", studentData.message, "error");
        }
      } catch {
        Swal.fire("Error", "Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (key: string, value: string) => {
    if (!student) return;
    setStudent((prev) => ({ ...prev!, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // ✅ Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!student.classLevel) newErrors.classLevel = "Class is required";
    if (!student.name) newErrors.name = "Name is required";
    if (!student.fatherName) newErrors.fatherName = "Father's name is required";
    if (!student.motherName) newErrors.motherName = "Mother's name is required";
    if (!student.dob) newErrors.dob = "Date of birth is required";
    if (!student.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10,15}$/.test(student.mobile)) {
      newErrors.mobile = "Enter a valid mobile number (10–15 digits)";
    }
    if (!student.parentMobile) {
      newErrors.parentMobile = "Parent mobile number is required";
    } else if (!/^\d{10,15}$/.test(student.parentMobile)) {
      newErrors.parentMobile = "Enter a valid parent mobile number (10–15 digits)";
    }
    if (!student.birthSerial) newErrors.birthSerial = "Birth serial number is required";
    if (!student.gender) newErrors.gender = "Gender is required";
    if (!student.address) newErrors.address = "Address is required";
    if (!student.otherInfo) {
      handleChange("otherInfo", "No other information");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Update student
  const handleSubmit = async () => {
    if (!student) return;

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`https://student-management-server-xwpm.onrender.com/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();
      if (data.status === "success") {
        Swal.fire("Success", "Student updated successfully!", "success");
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (!student) return <p className="p-6">Student not found</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update Student</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Class */}
          <div>
            <Label>Class *</Label>
            <Select
              value={student.classLevel || ""}
              onValueChange={(val) => handleChange("classLevel", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classInfo.map((cl) => (
                  <SelectItem key={cl._id} value={cl.classLevel || ""}>
                    Class {cl.classLevel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.classLevel && (
              <p className="text-sm text-red-500 mt-1">{errors.classLevel}</p>
            )}
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input
                placeholder="Enter full name"
                value={student.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label>Father&#39;s Name *</Label>
              <Input
                placeholder="Enter father's name"
                value={student.fatherName || ""}
                onChange={(e) => handleChange("fatherName", e.target.value)}
              />
              {errors.fatherName && (
                <p className="text-sm text-red-500 mt-1">{errors.fatherName}</p>
              )}
            </div>
            <div>
              <Label>Mother&#39;s Name *</Label>
              <Input
                placeholder="Enter mother's name"
                value={student.motherName || ""}
                onChange={(e) => handleChange("motherName", e.target.value)}
              />
              {errors.motherName && (
                <p className="text-sm text-red-500 mt-1">{errors.motherName}</p>
              )}
            </div>
            <div>
              <Label>Date of Birth *</Label>
              <Input
                type="date"
                value={student.dob || ""}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
              {errors.dob && (
                <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
              )}
            </div>
            <div>
              <Label>Mobile Number *</Label>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={student.mobile || ""}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
              {errors.mobile && (
                <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
              )}
            </div>
            <div>
              <Label>Parent Mobile Number *</Label>
              <Input
                type="tel"
                placeholder="Enter parent mobile number"
                value={student.parentMobile || ""}
                onChange={(e) => handleChange("parentMobile", e.target.value)}
              />
              {errors.parentMobile && (
                <p className="text-sm text-red-500 mt-1">{errors.parentMobile}</p>
              )}
            </div>
            <div>
              <Label>Birth Serial Number *</Label>
              <Input
                placeholder="Enter birth serial number"
                value={student.birthSerial || ""}
                onChange={(e) => handleChange("birthSerial", e.target.value)}
              />
              {errors.birthSerial && (
                <p className="text-sm text-red-500 mt-1">{errors.birthSerial}</p>
              )}
            </div>
            <div>
              <Label>Gender *</Label>
              <Select
                value={student.gender || ""}
                onValueChange={(val) => handleChange("gender", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* Previous School */}
          <div>
            <Label>Previous School</Label>
            <Input
              placeholder="Enter previous school name"
              value={student.previousSchool || ""}
              onChange={(e) => handleChange("previousSchool", e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <Label>Address *</Label>
            <Textarea
              placeholder="Enter complete address"
              value={student.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Other Information */}
          <div>
            <Label>Other Information</Label>
            <Textarea
              placeholder="Enter any additional information"
              value={student.otherInfo || ""}
              onChange={(e) => handleChange("otherInfo", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button onClick={handleSubmit} disabled={saving} className="w-full md:w-auto">
              {saving ? "Updating..." : "Update Student"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
