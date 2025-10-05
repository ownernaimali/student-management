"use client";

import { useState, useEffect } from "react";
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
    birthSerial: "",
    dob: "",
    mobile: "",
    parentMobile: "",
    gender: "",
    classLevel: "",
    address: "",
    otherInfo: "",
    attendanceHistory: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(true); 

  // Classes state
  type ClassType = { _id: string; classLevel: string };
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/classes"
        );
        const data = await res.json();

        if (res.ok) {
          setClasses(data.data); // assuming API returns an array of classes
        } else {
          console.error("Failed to fetch classes:", data.message || data.error);
        }
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoadingClasses(false);
        setLoadingAnimation(false); 
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (key: keyof typeof student, value: string) => {
    setStudent((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
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
    if (!student.parentMobile) newErrors.parentMobile = "Parent Mobile is required";
    if (!student.birthSerial) newErrors.parentMobile = "Birth Serial Number is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true); 

      const res = await fetch(
        "http://localhost:3001/api/students",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire(
          "Success",
          `Student added.`,
          "success"
        );
        setStudent({
    name: "",
    fatherName: "",
    motherName: "",
    birthSerial: "",
    dob: "",
    mobile: "",
    parentMobile: "",
    gender: "",
    classLevel: "",
    address: "",
    otherInfo: "",
    attendanceHistory: [],
        });
        setErrors({});
      } else {
        Swal.fire("Error", data.message || data.error, "error");
      }
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Try Again!";
      Swal.fire("Request Failed", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loadingAnimation) {
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
                <SelectValue
                  placeholder={
                    loadingClasses ? "Loading classes..." : "Select class"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {classes.length > 0 ? (
                  classes.map((cls) => (
                    <SelectItem key={cls._id} value={cls.classLevel}>
                      Class {cls.classLevel}
                    </SelectItem>
                  ))
                ) : (
                  !loadingClasses && (
                    <p className="text-muted-foreground px-2 py-1">
                      No classes found
                    </p>
                  )
                )}
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
            <div className="md:col-span-2">
              <Label>
                Parent Mobile Number
              </Label>
              <Input
                placeholder="Enter Parent Mobile number"
                value={student.parentMobile}
                onChange={(e) => handleChange("parentMobile", e.target.value)}
              />
              {errors.parentMobile && (
                <p className="text-sm text-red-500 mt-1">{errors.parentMobile}</p>
              )}
            </div>
              <div className="md:col-span-2">
              <Label>
                Birth Serial No
              </Label>
              <Input
                placeholder="Enter birth serial number"
                value={student.birthSerial}
                onChange={(e) => handleChange("birthSerial", e.target.value)}
              />
              {errors.birthSerial && (
                <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
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
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
              )}
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
              {loading ? "Submitting..." : "Add Student"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}