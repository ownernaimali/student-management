'use client';

import { useState } from "react";
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
  });

  const handleChange = (key: keyof typeof teacher, value: string) => {
    setTeacher((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Teacher Info:", teacher);
    // Call API or logic to handle the form submission
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Teacher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Enter full name"
                value={teacher.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                placeholder="Enter subject"
                value={teacher.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
              />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={teacher.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={teacher.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
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
            </div>
            <div>
              <Label>Qualification</Label>
              <Input
                placeholder="Enter qualification"
                value={teacher.qualification}
                onChange={(e) => handleChange("qualification", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                placeholder="Enter address"
                value={teacher.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Other Information</Label>
              <Textarea
                placeholder="Enter any additional info"
                value={teacher.otherInfo}
                onChange={(e) => handleChange("otherInfo", e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSubmit}>Submit Teacher</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
