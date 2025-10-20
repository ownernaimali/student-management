// @ts-nocheck
"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EditExamPage() {
	const {id, subject}  = useParams();
	const router = useRouter();
  const [exam, setExam] = useState({});
  const [examDetail, setExamDetail] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch exam data by ID
  useEffect(() => {
   if(!(id  && subject)) {
        router.push("/dashboard/exams/all");
        return;
    }

    fetch(`http://localhost:3001/api/exams/id/${id}/${subject}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setExam(data?.data);
          setExamDetail(data.data?.examDetail);

          } else if (data.status == "error" && data.type == "server"){
          	router.push("/dashboard/exams/all");
          }
      })
      .catch((e) => console.log(e));
      setLoading(false);
  }, []);

 


  // Submit handler
  const handleSubmit = () => {

fetch(`http://localhost:3001/api/exams/id/${id}/${subject}`, {
	method: "PUT",
	headers: {"Content-Type": "application/json"},
	body: JSON.stringify(examDetail)
})
      .then((res) => res.json())
      .then((data) => {
     if(data.status == "success") {
		Swal.fire("Success", data.message, "success")
		router.push("/dashboard/exams/all")
      }
     else  if(data.status == "error")
      	Swal.fire("Hello", data.message, "error")
      })
    }

if(loading) {
	return <p>loading</p>
}

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update Exam <span className="text-sky-500">{exam.subject}</span></CardTitle>

        </CardHeader>

        <CardContent className="space-y-6">

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>
                        Exam Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        required
                        value={examDetail.date || ""}
                        onChange={(e) => setExamDetail({...examDetail, date: e.target.value})}
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
                        value={examDetail.marks || ""}
                        onChange={(e) => setExamDetail({...examDetail, marks: e.target.value})} 
                      />
                    </div>

                    <div>
                      <Label>
                        Exam Start Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="time"
                        required
                        value={examDetail.examStartTime || ""}
                        onChange={(e) => setExamDetail({...examDetail, examStartTime: e.target.value})  }

                      />
                    </div>

                    <div>
                      <Label>
                        Exam End Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="time"
                        required
                        value={examDetail.examEndTime || ""}
                        onChange={(e) => setExamDetail({...examDetail, examEndTime: e.target.value})} 
 
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
                        value={examDetail.duration || ""}
                        onChange={(e) => setExamDetail({...examDetail, duration: e.target.value})}  
   
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Notes (optional)</Label>
                      <Textarea
                        placeholder="Any notes for this subject exam"
                        value={examDetail.notes || ""}
                        onChange={(e) => setExamDetail({...examDetail, notes: e.target.value})  }
                      />
                    </div>
                  </div>

              {/* Submit Button */}
              <div className="pt-4">
              	<Button className="m-2" variant="outline" onClick={() => router.push("/dashboard/exams/all")}>Back</Button>
                <Button onClick={handleSubmit}>
                  Update
                </Button>
              </div>
        </CardContent>
      </Card>
    </main>
  );
}

