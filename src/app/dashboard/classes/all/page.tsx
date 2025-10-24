// app/classes/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Swal from "sweetalert2";
type ClassType = {
  _id: string;
  classLevel: string;
  subjects: string[];
  firstTeacher: { _id: string; name: string } | string;
  room: string;
  notes: string;
};

export default function ViewClassesPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/classes");
        const result = await res.json();

        if (res.ok && result.status === "success") {
          setClasses(result.data || []);
        } else {
          console.error(result.message || "Failed to load classes");
        }
      } catch (e) {
        console.error("Error fetching classes:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);


const handleDelete = (id: string) => {
  fetch(`http://localhost:3001/api/classes/id/${id}`, {
    method: "DELETE",
  })
  .then(res => res.json())
  .then(data => {
    if(data.status==="success") {
      setClasses(prev => prev.filter(c => c._id !== id));
      Swal.fire("Successfull", "Delete Class", "success")      
    }
  })
}

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Classes</h1>

      {loading && <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading classes...</p>
        </div>
      </div>}

      {!loading && classes.length === 0 && (
        <p className="text-gray-500">No classes found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <Card key={cls._id}>
            <CardHeader>
              <CardTitle>{cls.classLevel}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Subjects */}
              <div>
                <strong>Subjects: </strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {cls.subjects?.map((subj, i) => (
                    <Badge key={i} variant="secondary">
                      {subj}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Teacher */}
              <div>
                <strong>First Teacher: </strong>
                <span>
                  {typeof cls.firstTeacher === "string"
                    ? cls.firstTeacher
                    : cls.firstTeacher?.name}
                </span>
              </div>

              {/* Room */}
              <div>
                <strong>Room: </strong> {cls.room}
              </div>

              {/* Notes */}
              {cls.notes && (
                <div>
                  <strong>Notes: </strong> {cls.notes}
                </div>
              )}

              {/* Action buttons (future: edit, delete) */}
              <div className="pt-2 flex gap-2">
               <Link href={`/dashboard/classes/update/${cls._id}/edit`}>
               <Button variant="outline" size="sm">
                  Edit
                </Button>
                </Link>
                <Button onClick={() => handleDelete(cls._id)} variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
