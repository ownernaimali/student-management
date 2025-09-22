'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const handleChange = (key: keyof typeof student, value: string) => {
    setStudent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Student Info:", student);
    // Here you would usually call an API to submit the data
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
        <div>
  <Label>Class</Label>
  <Select value={student.classLevel} onValueChange={(val) => handleChange("classLevel", val)}>
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
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Enter full name"
                value={student.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Father&#39;s Name</Label>
              <Input
                placeholder="Enter father&#39; name"
                value={student.fatherName}
                onChange={(e) => handleChange("fatherName", e.target.value)}
              />
            </div>
            <div>
              <Label>Mother&#39;s Name</Label>
              <Input
                placeholder="Enter mother&#39;s name"
                value={student.motherName}
                onChange={(e) => handleChange("motherName", e.target.value)}
              />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={student.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={student.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select onValueChange={(val) => handleChange("gender", val)}>
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
            <div className="md:col-span-2">
              <Label>Previous School <span className="text-muted-foreground">(optional)</span></Label>
              <Input
                placeholder="Enter previous school"
                value={student.previousSchool}
                onChange={(e) => handleChange("previousSchool", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                placeholder="Enter address"
                value={student.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
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

          <div className="pt-4">
            <Button onClick={handleSubmit}>Submit Student</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

