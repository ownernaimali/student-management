// app/classes/add/page.tsx
"use client";

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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddClassPage() {
  const [classData, setClassData] = useState({
    name: "",
    section: "",
    teacher: "",
    room: "",
    notes: "",
  });

  const handleChange = (key: keyof typeof classData, value: string) => {
    setClassData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Class Created:", classData);
    // 👉 Call API (POST /api/classes)
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update New Class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Class Name */}
          <div>
            <Label>Class Name / Level</Label>
            <Input
              placeholder="Enter class name (e.g. Nursery, KG, 1, 2...)"
              value={classData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Section */}
          <div>
            <Label>Section</Label>
            <Input
              placeholder="e.g. A, B, C"
              value={classData.section}
              onChange={(e) => handleChange("section", e.target.value)}
            />
          </div>

          {/* Teacher */}
          <div>
            <Label>Assign Teacher</Label>
            <Select
              value={classData.teacher}
              onValueChange={(val) => handleChange("teacher", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Mr. John Doe</SelectItem>
                <SelectItem value="2">Ms. Sarah Lee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Room */}
          <div>
            <Label>Room Number</Label>
            <Input
              placeholder="e.g. Room 101"
              value={classData.room}
              onChange={(e) => handleChange("room", e.target.value)}
            />
          </div>

          {/* Notes */}
          <div>
            <Label>Notes</Label>
            <Textarea
              placeholder="Any extra details"
              value={classData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          <div className="pt-4">
            <Button onClick={handleSubmit} className="w-full">
              Update Class
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
