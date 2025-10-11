// @ts-nocheck
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

export default function AddExamPage() {
  const [totalClass, setTotalClass] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [filterClass, setFilterClass] = useState(null);
  const [examData, setExamData] = useState({});

  // Fetch classes
  useEffect(() => {
    fetch("http://localhost:3001/api/classes")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTotalClass(data.data);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  // When class selected, set subjects and default exam data
  useEffect(() => {
    if (selectedClass) {
      const foundClass = totalClass.find(
        (cls) => cls.classLevel == selectedClass
      );
      setFilterClass(foundClass || null);

      if (foundClass) {
        const initialData = {};
        foundClass.subjects.forEach((subject) => {
          initialData[subject] = {
            date: "",
            marks: "",
            startTime: "",
            endTime: "",
            duration: "",
            notes: "",
          };
        });
        setExamData(initialData);
      }
    } else {
      setFilterClass(null);
      setExamData({});
    }
  }, [selectedClass, totalClass]);

  // Handle input updates
  const handleInputChange = (subject, field, value) => {
    setExamData((prev) => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: value,
      },
    }));
  };

  // ✅ Validate before submission
  const validateExamData = () => {
    for (const subject in examData) {
      const { date, marks, startTime, endTime, duration } = examData[subject];
      if (!date || !marks || !startTime || !endTime || !duration) {
        return `All fields (except Notes) are required for ${subject}.`;
      }
    }
    return null;
  };

  // Submit handler
  const handleSubmit = () => {
    const validationError = validateExamData();
    if (validationError) {
      Swal.fire({
        icon: "warning",
        title: "Missing Required Fields",
        text: validationError,
      });
      return;
    }

    // ✅ Send data to backend
    fetch("http://localhost:3001/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstTeacher: filterClass?.firstTeacher || "",
        status: "upcoming",
        date: new Date(),
        classLevel: selectedClass,
        exams: examData,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success", "Exam data added successfully!", "success");
        setSelectedClass(null);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to add exam data!", "error");
      });
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Exam</CardTitle>

          {selectedClass && (
            <div className="mt-4">
              <Button variant="outline" onClick={() => setSelectedClass(null)}>
                Back
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {selectedClass ? (
            <>
              {filterClass?.subjects?.map((subject, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-4">
                  <p className="text-xl font-semibold mb-4">
                    Subject:{" "}
                    <span className="text-sky-500">{subject}</span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>
                        Exam Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        required
                        value={examData[subject]?.date || ""}
                        onChange={(e) =>
                          handleInputChange(subject, "date", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>
                        Marks <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="number"
                        required
                        placeholder="Enter Marks (e.g. 100)"
                        value={examData[subject]?.marks || ""}
                        onChange={(e) =>
                          handleInputChange(subject, "marks", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>
                        Exam Start Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="time"
                        required
                        value={examData[subject]?.startTime || ""}
                        onChange={(e) =>
                          handleInputChange(subject, "startTime", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>
                        Exam End Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="time"
                        required
                        value={examData[subject]?.endTime || ""}
                        onChange={(e) =>
                          handleInputChange(subject, "endTime", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>
                        Duration <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        required
                        placeholder="Enter Duration (e.g. 1h 30min)"
                        value={examData[subject]?.duration || ""}
                        onChange={(e) =>
                          handleInputChange(subject, "duration", e.target.value)
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Notes (optional)</Label>
                      <Textarea
                        placeholder="Any notes for this subject exam"
                        value={examData[subject]?.notes || ""}
                        onChange={(e) =>
                          handleInputChange(subject, "notes", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              <div className="pt-4">
                <Button onClick={handleSubmit}>
                  Add Exam for All Subjects
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label>Select Class</Label>
                <Select onValueChange={(value) => setSelectedClass(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {totalClass.map((cls, idx) => (
                      <SelectItem key={idx} value={cls.classLevel}>
                        Class {cls.classLevel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

