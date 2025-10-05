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
    classLevel: "",
    subjects: [] as string[],
    firstTeacher: "",
    room: "",
    notes: "",
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [formErrors, setFormErrors] = useState({
    classLevel: false,
    subjects: false,
    firstTeacher: false,
    room: false,
  });

  type Teacher = { name: string; [key: string]: unknown };
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: keyof typeof classData, value: unknown) => {
    setClassData((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (key !== "notes" && key !== "subjects") {
      setFormErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const addSubject = () => {
    if (subjectInput.trim() !== "") {
      setClassData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subjectInput.trim()],
      }));
      setSubjectInput("");
      setFormErrors((prev) => ({ ...prev, subjects: false }));
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
        const res = await fetch("https://student-management-server-xwpm.onrender.com/api/teachers");
        const data = await res.json();
        if (res.ok) {
          setTeachers(data.data); 
        } else {
          Swal.fire("Error", data.message || "Failed to load teachers", "error");
        }
      } catch (e) {
        Swal.fire(
          "Error",
          typeof e === "object" && e !== null && "message" in e
            ? (e as { message?: string }).message
            : "Could not fetch teachers",
          "error"
        );
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  const validateForm = () => {
    const errors = {
      classLevel: !classData.classLevel.trim(),
      subjects: classData.subjects.length === 0,
      firstTeacher: !classData.firstTeacher.trim(),
      room: !classData.room.trim(),
    };

    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("https://student-management-server-xwpm.onrender.com/api/classes", {
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
          classLevel: "",
          subjects: [],
          firstTeacher: "",
          room: "",
          notes: "",
        });
        setFormErrors({
          classLevel: false,
          subjects: false,
          firstTeacher: false,
          room: false,
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubject();
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Fields marked with <span className="text-red-500">*</span> are required
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            {/* Class Name / Level */}
            <div>
              <Label htmlFor="classLevel">
                Class Name / Level <span className="text-red-500">*</span>
              </Label>
              <Input
                id="classLevel"
                placeholder="Enter class name (e.g. Nursery, KG, 1, 2...)"
                value={classData.classLevel}
                onChange={(e) => handleChange("classLevel", e.target.value)}
                className={formErrors.classLevel ? "border-red-500" : ""}
                required
              />
              {formErrors.classLevel && (
                <p className="text-red-500 text-sm mt-1">Class level is required</p>
              )}
            </div>

            {/* Subjects (Dynamic List) */}
            <div>
              <Label>
                Subjects <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter subject (e.g. Math, English)"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={formErrors.subjects ? "border-red-500" : ""}
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
                    <Button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-400 hover:text-red-600 p-0 h-4 w-4"
                      variant="ghost"
                    >
                      ✕
                    </Button>
                  </span>
                ))}
              </div>
              {formErrors.subjects && (
                <p className="text-red-500 text-sm mt-1">At least one subject is required</p>
              )}
            </div>

            {/* First Teacher */}
            <div>
              <Label htmlFor="firstTeacher">
                First Teacher <span className="text-red-500">*</span>
              </Label>
              <Select
                value={classData.firstTeacher}
                onValueChange={(val) => handleChange("firstTeacher", val)}
                required
              >
                <SelectTrigger 
                  id="firstTeacher"
                  className={formErrors.firstTeacher ? "border-red-500" : ""}
                >
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
              {formErrors.firstTeacher && (
                <p className="text-red-500 text-sm mt-1">First teacher is required</p>
              )}
            </div>

            {/* Room */}
            <div>
              <Label htmlFor="room">
                Room Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="room"
                placeholder="e.g. Room 101"
                value={classData.room}
                onChange={(e) => handleChange("room", e.target.value)}
                className={formErrors.room ? "border-red-500" : ""}
                required
              />
              {formErrors.room && (
                <p className="text-red-500 text-sm mt-1">Room number is required</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any extra details (optional)"
                value={classData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Class..." : "Add Class"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
