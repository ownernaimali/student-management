"use client";

import { useState } from "react";
import Swal from "sweetalert2";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddStudentPage() {
  const [student, setStudent] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    mobile: "",
    gender: "",
    classLevel: "",
    previousSchool: "",
    address: "",
    otherInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof student, value: string) => {
    setStudent((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // clear error while typing
  };

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
    if (!student.gender) newErrors.gender = "Gender is required";
    if (!student.address) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // stop if validation fails

    try {
      setLoading(true);

      const res = await fetch("http:localhost:3001/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", `Student added. <p style="font-size: 12px; margin-top: 2px;">(ID: ${data.id})</p>`, "success");
        setStudent({
          name: "",
          fatherName: "",
          motherName: "",
          dob: "",
          mobile: "",
          gender: "",
          classLevel: "",
          previousSchool: "",
          address: "",
          otherInfo: "",
        });
        setErrors({});
      } else {
        Swal.fire("Error", data.message || data.error, "error");
      }
      
    } catch (e: unknown){
    {
      Swal.fire("Request Failed", "Try Again!", "error");
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Class */}
          <div>
            <Label>Class</Label>
            <Select
              value={student.classLevel}
              onValueChange={(val) => handleChange("classLevel", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    Class {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.classLevel && (
              <p className="text-sm text-red-500 mt-1">{errors.classLevel}</p>
            )}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Enter full name"
                value={student.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label>Father&#39;s Name</Label>
              <Input
                placeholder="Enter father&#39;s name"
                value={student.fatherName}
                onChange={(e) => handleChange("fatherName", e.target.value)}
              />
              {errors.fatherName && (
                <p className="text-sm text-red-500 mt-1">{errors.fatherName}</p>
              )}
            </div>
            <div>
              <Label>Mother&#39;s Name</Label>
              <Input
                placeholder="Enter mother&#39;s name"
                value={student.motherName}
                onChange={(e) => handleChange("motherName", e.target.value)}
              />
              {errors.motherName && (
                <p className="text-sm text-red-500 mt-1">{errors.motherName}</p>
              )}
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={student.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
              {errors.dob && (
                <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
              )}
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={student.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
              {errors.mobile && (
                <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
              )}
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                value={student.gender}
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
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label>
                Previous School{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                placeholder="Enter previous school"
                value={student.previousSchool}
                onChange={(e) =>
                  handleChange("previousSchool", e.target.value)
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                placeholder="Enter address"
                value={student.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">{errors.address}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label>Other Information</Label>
              <Textarea
                placeholder="Enter any additional info"
                value={student.otherInfo}
                onChange={(e) => handleChange("otherInfo", e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Student"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
