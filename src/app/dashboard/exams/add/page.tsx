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

type SubjectExam = {
  date: string;
  duration: string;
  marks: string;
  examStartTime: string;
  examEndTime: string;
  status: "upcoming";
  notes?: string;
};

type ExamData = {
  [subject: string]: SubjectExam;
};

export default function AddExamPage() {
  const [classLevel, setClassLevel] = useState("");
  const [exam, setExam] = useState<ExamData>({});
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(true); 

  // Classes state
  type ClassType = { _id: string; classLevel: string };
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  // Selected class state
  const [selectedClass, setSelectedClass] = useState({
    classLevel: "",
    subjects: [] as string[],
    firstTeacher: "",
    room: "",
    notes: "",
  });

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          "https://student-management-server-xwpm.onrender.com/api/classes"
        );
        const data = await res.json();

        if (res.ok) {
          setClasses(data.data); 
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

  // Initialize exam data when class is selected
  useEffect(() => {
    if (classLevel && selectedClass.subjects.length > 0) {
      const initialExamData: ExamData = {};
      selectedClass.subjects.forEach(subject => {
        initialExamData[subject] = {
          date: "",
          duration: "",
          marks: "",
          examStartTime: "",
          examEndTime: "",
          status: "upcoming",
          notes: ""
        };
      });
      setExam(initialExamData);
    }
  }, [classLevel, selectedClass.subjects]);

  const handleSubjectChange = (subject: string, field: keyof SubjectExam, value: string) => {
    setExam(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: value
      }
    }));
    // Clear error for this field
    setErrors(prev => ({ ...prev, [`${subject}_${field}`]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(exam).forEach(([subject, subjectExam]) => {
      if (!subjectExam.date) newErrors[`${subject}_date`] = `${subject} date is required`;
      if (!subjectExam.duration) newErrors[`${subject}_duration`] = `${subject} duration is required`;
      if (!subjectExam.marks) newErrors[`${subject}_marks`] = `${subject} marks is required`;
      if (!subjectExam.examStartTime) newErrors[`${subject}_examStartTime`] = `${subject} start time is required`;
      if (!subjectExam.examEndTime) newErrors[`${subject}_examEndTime`] = `${subject} end time is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true); 

      const examData = {
        classLevel,
        firstTeacher: selectedClass.firstTeacher,
        date: new Date(),
        exams: exam
      };
console.log(examData);
      const res = await fetch(
        "https://student-management-server-xwpm.onrender.com/api/exams", // Update this endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(examData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire(
          "Success",
          `Exam added successfully for all subjects.`,
          "success"
        );
        // Reset form
        setExam({});
        setClassLevel("");
        setSelectedClass({
          classLevel: "",
          subjects: [],
          firstTeacher: "",
          room: "",
          notes: "",
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

  // Mock function to get class details - replace with your actual API call
  const handleClassSelect = async (classLevel: string) => {
    setClassLevel(classLevel);
    // This should be replaced with your actual API call to get class details
    const classDetails = {
      classLevel: classLevel,
      subjects: ["Bangla", "English", "Math", "Biology"], // Fixed typo from "Bistrology"
      firstTeacher: "Md. Naim Ali",
      room: "101",
      notes: "any notes",
    };
    setSelectedClass(classDetails);
  };

  if (loadingAnimation) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Exam</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Class Selection */}
          <div>
            <Label>Class</Label>
            <Select
              value={classLevel}
              onValueChange={handleClassSelect}
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
                    <SelectItem key={cls._id} value={cls.classLevel || ""}>
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
          </div>

          {/* Exam Details for Each Subject */}
          {selectedClass.subjects.map((subject) => (
            <div key={subject} className="border rounded-lg p-4 space-y-4">
              <p className="text-xl font-semibold mb-4">
                Subject: <span className="text-sky-500">{subject}</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Exam Date */}
                <div>
                  <Label>Exam Date</Label>
                  <Input
                    type="date"
                    value={exam[subject]?.date || ""}
                    onChange={(e) => handleSubjectChange(subject, "date", e.target.value)}
                  />
                  {errors[`${subject}_date`] && (
                    <p className="text-sm text-red-500 mt-1">{errors[`${subject}_date`]}</p>
                  )}
                </div>

                {/* Marks */}
                <div>
                  <Label>Marks</Label>
                  <Input
                    placeholder="Enter Marks 100 or any"
                    value={exam[subject]?.marks || ""}
                    onChange={(e) => handleSubjectChange(subject, "marks", e.target.value)}
                  />
                  {errors[`${subject}_marks`] && (
                    <p className="text-sm text-red-500 mt-1">{errors[`${subject}_marks`]}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <Label>Duration</Label>
                  <Input
                    type="text"
                    placeholder="Enter Duration 1h 30min or any"
                    value={exam[subject]?.duration || ""}
                    onChange={(e) => handleSubjectChange(subject, "duration", e.target.value)}
                  />
                  {errors[`${subject}_duration`] && (
                    <p className="text-sm text-red-500 mt-1">{errors[`${subject}_duration`]}</p>
                  )}
                </div>

                {/* Start Time */}
                <div>
                  <Label>Exam Start Time</Label>
                  <Input
                    type="time"
                    value={exam[subject]?.examStartTime || ""}
                    onChange={(e) => handleSubjectChange(subject, "examStartTime", e.target.value)}
                  />
                  {errors[`${subject}_examStartTime`] && (
                    <p className="text-sm text-red-500 mt-1">{errors[`${subject}_examStartTime`]}</p>
                  )}
                </div>

                {/* End Time */}
                <div>
                  <Label>Exam End Time</Label>
                  <Input
                    type="time"
                    value={exam[subject]?.examEndTime || ""}
                    onChange={(e) => handleSubjectChange(subject, "examEndTime", e.target.value)}
                  />
                  {errors[`${subject}_examEndTime`] && (
                    <p className="text-sm text-red-500 mt-1">{errors[`${subject}_examEndTime`]}</p>
                  )}
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Any notes for this subject exam"
                    value={exam[subject]?.notes || ""}
                    onChange={(e) => handleSubjectChange(subject, "notes", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          {selectedClass.subjects.length > 0 && (
            <div className="pt-4">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Add Exam for All Subjects"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
