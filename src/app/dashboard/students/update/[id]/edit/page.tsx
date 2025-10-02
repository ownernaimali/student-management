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

type Student = {
  _id: string;
  classLevel?: string;
  name?: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  mobile?: string;
  gender?: string;
  previousSchool?: string;
  address?: string;
  otherInfo?: string;
  [key: string]: unknown;
};

type MyClass = {
  name: string;
};
export default function UpdateStudentPage() {
  const { id } = useParams();

  const [student, setStudent] = useState<Student>({
    _id: "",
    classLevel: "",
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    mobile: "",
    gender: "",
    previousSchool: "",
    address: "",
    otherInfo: "",
  });
  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState<MyClass[]>([{name: ""}]);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch student by ID
  useEffect(() => {
  
    if (!id) return;
    const fetchStudent = async () => {
      try {
      
  fetch("https://student-management-server-xwpm.onrender.com/api/classes")
  .then(res => res.json())
  .then(data => setClassInfo(data.data))
  
        const res = await fetch(`https://student-management-server-xwpm.onrender.com/api/students/${id}`);
        const data = await res.json();
        if (res.ok) {
          setStudent(data.data);
        } else {
          Swal.fire("Error", data.message, "error");
        }
      } catch {
        Swal.fire("Error", "Failed to load student", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (key: string, value: string) => {
    if (!student) return;
    setStudent((prev) => ({ ...prev!, [key]: value }));
  };

  // ✅ Update student
  const handleSubmit = async () => {
    if (!student) return;

    // Validation
   /* if (!student.name || !student.classLevel) {
      Swal.fire("Validation Error", "Name and Class are required", "warning");
      return;
    }
*/
    setSaving(true);
    try {

      const res = await fetch(`https://student-management-server-xwpm.onrender.com/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();
      if (res.ok) {
        await Swal.fire("Success", "Student updated successfully!", "success");
  
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading student...</p>;
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
            <Label>Class</Label>
            <Select
              value={student.classLevel || ""}
              onValueChange={(val) => handleChange("classLevel", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classInfo.map((cl, i) => (
                  <SelectItem key={i + 1} value={cl.name}>
                    Class {cl.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={student.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Father&#39;s Name</Label>
              <Input
                value={student.fatherName || ""}
                onChange={(e) => handleChange("fatherName", e.target.value)}
              />
            </div>
            <div>
              <Label>Mother&#39;s Name</Label>
              <Input
                value={student.motherName || ""}
                onChange={(e) => handleChange("motherName", e.target.value)}
              />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={student.dob || ""}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                value={student.mobile || ""}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </div>
            <div>
              <Label>Gender</Label>
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
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Extra fields */}
          <div>
            <Label>Previous School</Label>
            <Input
              value={student.previousSchool || ""}
              onChange={(e) => handleChange("previousSchool", e.target.value)}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Textarea
              value={student.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div>
            <Label>Other Information</Label>
            <Textarea
              value={student.otherInfo || ""}
              onChange={(e) => handleChange("otherInfo", e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Updating..." : "Update Student"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
