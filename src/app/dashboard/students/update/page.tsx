"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {useState} from "react"

export default function SearchStudentsPage() {
const [student, setStudent]= useState([]);
  
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Search Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter name, class, mobile, etc."
            />
            <Button >
              Search
            </Button>
          </div>
{ /*
          {student.length > 0 && (
            <div className="mt-4 space-y-2">
              {student.map((s) => (
                <div key={s._id} className="p-3 border rounded-md">
                  <p><strong>Name:</strong> {s.name}</p>
                  <p><strong>Father:</strong> {s.fatherName}</p>
                  <p><strong>Class:</strong> {s.classLevel}</p>
                  <p><strong>Mobile:</strong> {s.mobile}</p>
                  <p><strong>Address:</strong> {s.address}</p>
                </div>
              ))}
            </div>
          )}
          
          */}
        </CardContent>
      </Card>
    </main>
  );
}
