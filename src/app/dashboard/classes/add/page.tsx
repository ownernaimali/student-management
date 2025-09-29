// app/classes/add/page.tsx
"use client";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
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
    subjects: [] as string[],
    firstTeacher: "",
    room: "",
    notes: "",
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  const handleChange = (key: keyof typeof classData, value: any) => {
    setClassData((prev) => ({ ...prev, [key]: value }));
  };

  const addSubject = () => {
    if (subjectInput.trim() !== "") {
      setClassData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subjectInput.trim()],
      }));
      setSubjectInput("");
    }
  };

  const removeSubject = (index: number) => {
    setClassData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoadingTeachers(true);
        const res = await fetch("http://localhost:3001/api/teachers");
        const data = await res.json();
        if (res.ok) {
          setTeachers(data.data); 
        } else {
          Swal.fire("Error", data.message || "Failed to load teachers", "error");
        }
      } catch (e) {
        console.error(e);
        Swal.fire("Error", "Could not fetch teachers", "error");
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classData),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Class Added",
          text: `Class created successfully! ID: ${data.id}`,
        });
        setClassData({
          name: "",
          subjects: [],
          firstTeacher: "",
          room: "",
          notes: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data?.message || "Failed to add class.",
        });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Class Name / Level */}
          <div>
            <Label>Class Name / Level</Label>
            <Input
              placeholder="Enter class name (e.g. Nursery, KG, 1, 2...)"
              value={classData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Subjects (Dynamic List) */}
          <div>
            <Label>Subjects</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter subject (e.g. Math, English)"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
              />
              <Button type="button" onClick={addSubject}>
                Add
              </Button>
            </div>

            {/* Display Added Subjects */}
            <div className="flex flex-wrap gap-2 mt-2">
              {classData.subjects.map((subj, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2"
                >
                  {subj}
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* First Teacher */}
          <div>
            <Label>First Teacher</Label>
            <Select
              value={classData.firstTeacher}
              onValueChange={(val) => handleChange("firstTeacher", val)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loadingTeachers ? "Loading teachers..." : "Select teacher"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher, index) => (
                  <SelectItem key={index} value={teacher.name}>
                    {teacher.name}
                  </SelectItem>
                ))}
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
              Save Class
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
