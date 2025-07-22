import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Code, CheckCircle } from "lucide-react";

export default function Management() {
  const [activeTests, setActiveTests] = useState([
    {
      id: 1,
      candidate: "John Doe",
      test: "JavaScript Fundamentals",
      status: "in-progress",
      timeLeft: "00:20",
      progress: 60,
    },
    {
      id: 2,
      candidate: "Jane Smith",
      test: "React Components",
      status: "pending",
      timeLeft: "00:30",
      progress: 0,
    },
  ]);
  const dispayCardData = [{}, {}, {}, {}];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Coding Assessment Platform
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage candidate assessments in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Candidates
                  </p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Tests in Progress
                  </p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Completed Today
                  </p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Live Assessment Monitor</CardTitle>
            <CardDescription>
              Real-time view of ongoing assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {test.candidate
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{test.candidate}</h3>
                      <p className="text-sm text-gray-600">{test.test}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        test.status === "in-progress" ? "default" : "secondary"
                      }
                    >
                      {test.status}
                    </Badge>
                    <div className="text-sm text-gray-600">
                      <Clock className="inline w-4 h-4 mr-1" />
                      {test.timeLeft}
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${test.progress}%` }}
                      ></div>
                    </div>
                    <Button size="sm" variant="outline">
                      Monitor
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
