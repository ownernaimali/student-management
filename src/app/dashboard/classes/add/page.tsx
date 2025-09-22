'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddClassPage() {
  const [classData, setClassData] = useState({
    className: "",
    section: "",
    teacher: "",
    capacity: "",
    description: "",
  });

  const handleChange = (key: keyof typeof classData, value: string) => {
    setClassData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Class Info Submitted:", classData);
    // Submit the data to API/backend
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Class Name</Label>
              <Input
                placeholder="e.g. Class 1, 9th B, Science"
                value={classData.className}
                onChange={(e) => handleChange("className", e.target.value)}
              />
            </div>
            <div>
              <Label>Section</Label>
              <Input
                placeholder="Optional: A, B, C..."
                value={classData.section}
                onChange={(e) => handleChange("section", e.target.value)}
              />
            </div>
            <div>
              <Label>Class Teacher</Label>
              <Input
                placeholder="Optional: Enter teacher's name"
                value={classData.teacher}
                onChange={(e) => handleChange("teacher", e.target.value)}
              />
            </div>
            <div>
              <Label>Capacity</Label>
              <Input
                type="number"
                placeholder="Max number of students"
                value={classData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description / Notes</Label>
              <Textarea
                placeholder="Optional: Describe the class, syllabus, etc."
                value={classData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
          <div className="pt-4">
            <Button onClick={handleSubmit}>Add Class</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
