'use client';

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import Link from "next/link";
interface Teacher {
  name?: string;
  subject?: string;
  mobile?: string;
  email?: string;
  gender?: string;
  qualification?: string;
  address?: string;
  otherInfo?: string;
  [key: string]: unknown;
}

export default function UpdateTeacherPage() {

  const { id } = useParams();
  const [teacher, setTeacher] = useState<Teacher>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/teachers/id/${id}`);
        const data = await res.json();

        if (data.status === "success") {
          setTeacher(data.data);
        }
        else {
        return;
        }
      } catch (e) {
        console.error("Teacher update page error: ", e);
      }
    };

    if (id) fetchTeacher();
  }, [id]);
  
  
  const handleChange = (key: keyof typeof teacher, value: string) => {
    setTeacher((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`http://localhost:3001/api/teachers/id/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        setResponse(`Teacher update successfully!`);
        Swal.fire({
          icon: "success",
          title: "Teacher Updated",
          text: `Teacher update successfully!`,
        });
      } else {
        setResponse(`Failed to update teacher: ${data.message || "Unknown error"}`);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to add teacher.",
        });
      }
      
    } catch (error) {
      setResponse("Failed to add teacher.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add teacher.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update Teacher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Enter full name"
                value={teacher.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                placeholder="Enter subject"
                value={teacher.subject || ""}
                onChange={(e) => handleChange("subject", e.target.value)}
              />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={teacher.mobile || ""}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={teacher.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                value={teacher.gender || ""}
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
                value={teacher.qualification || ""}
                onChange={(e) => handleChange("qualification", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                placeholder="Enter address"
                value={teacher.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Other Information</Label>
              <Textarea
                placeholder="Enter any additional info"
                value={teacher.otherInfo  || ""}
                onChange={(e) => handleChange("otherInfo", e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Link href="/dashboard/teachers">
            <Button variant="outline" className="mr-2">Back</Button>
            </Link>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Updating..." : "Update Teacher"}
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
