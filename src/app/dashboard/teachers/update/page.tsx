"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {useState} from "react"

export default function SearchTeacherPage() {
const [teacher, setTeacher]= useState([]);
  
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Search Teachers</CardTitle>
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
        </CardContent>
      </Card>
    </main>
  );
}
