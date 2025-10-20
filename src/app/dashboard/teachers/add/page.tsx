"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Swal from "sweetalert2";

export default function AddTeacherPage() {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    mobile: "",
    email: "",
    gender: "",
    qualification: "",
    address: "",
    otherInfo: "",
    password: "",
    role: "teacher",
    status: "active",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleChange = (key: keyof typeof teacher, value: string) => {
    setTeacher((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // clear error when user types
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!teacher.name.trim()) newErrors.name = "Name is required.";
    if (!teacher.subject.trim()) newErrors.subject = "Subject is required.";
    if (!teacher.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    if (!teacher.email.trim()) newErrors.email = "Email is required.";
    if (!teacher.password.trim()) newErrors.password = "Password is required.";
    if (!teacher.gender.trim()) newErrors.gender = "Gender is required.";
    if (!teacher.qualification.trim())
      newErrors.qualification = "Qualification is required.";
    if (!teacher.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields.",
      });
      return;
    }

    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("http://localhost:3001/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...teacher,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setResponse(`Teacher added successfully! ID: ${data.id}`);
        Swal.fire({
          icon: "success",
          title: "Teacher Added",
          text: `Teacher added successfully! ID: ${data.id}`,
        });

        // Reset form
        setTeacher({
          name: "",
          subject: "",
          mobile: "",
          email: "",
          gender: "",
          qualification: "",
          address: "",
          otherInfo: "",
          password: "",
          role: "teacher",
          status: "active",
        });
      } else {
        setResponse(`Failed to add teacher: ${data.message || "Unknown error"}`);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to add teacher.",
        });
      }

      console.log("API Response:", data);
    } catch (error) {
      console.error(error);
      setResponse("Failed to add teacher.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add teacher.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Teacher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Enter full name"
                value={teacher.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <Label>Subject</Label>
              <Input
                placeholder="Enter subject"
                value={teacher.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={teacher.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={teacher.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="text"
                placeholder="Enter password"
                value={teacher.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <Select
                value={teacher.gender}
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
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            {/* Qualification */}
            <div>
              <Label>Qualification</Label>
              <Input
                placeholder="Enter qualification"
                value={teacher.qualification}
                onChange={(e) =>
                  handleChange("qualification", e.target.value)
                }
              />
              {errors.qualification && (
                <p className="text-red-500 text-sm">{errors.qualification}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                placeholder="Enter address"
                value={teacher.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            {/* Other Info */}
            <div className="md:col-span-2">
              <Label>Other Information</Label>
              <Textarea
                placeholder="Enter any additional info"
                value={teacher.otherInfo}
                onChange={(e) => handleChange("otherInfo", e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Teacher"}
            </Button>
            {response && (
              <div className="text-sm text-green-600 mt-2">{response}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
