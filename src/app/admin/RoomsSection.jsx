import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Calendar, User2 } from "lucide-react";
import useAssignTestStore from "@/store/useAssignTestStore";
export default function RoomsSection() {
  const { assignedTest, fetchAssignedTest } = useAssignTestStore();
  useEffect(() => {
    fetchAssignedTest();
  }, []);

  const groupedByRoom = assignedTest.reduce((acc, test) => {
    if (!acc[test.room_name]) {
      acc[test.room_name] = [];
    }
    acc[test.room_name].push(test);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Assigned Test Rooms
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {assignedTest.length === 0 ? (
          <div className="col-span-full  flex justify-center items-center py-10 text-gray-500 text-lg font-medium border rounded-xl bg-white shadow">
            No Requests yet
          </div>
        ) : (
          Object.entries(groupedByRoom).map(([roomName, tests], idx) => (
            <Card
              key={idx}
              className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white rounded-2xl"
            >
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {roomName}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {tests.length} test{tests.length > 1 ? "s" : ""} assigned
                </p>
              </CardHeader>

              <CardContent className="divide-y divide-gray-200">
                {tests.map((test, i) => (
                  <div key={i} className="py-4 text-sm text-gray-700 space-y-2">
                    <div className="flex items-center gap-2">
                      <User2 className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-800">
                        {test.interviewer_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-green-600" />
                      <span>{test.question_list?.length || 0} questions</span>
                    </div>

                    {test.scheduled_datetime && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>
                          {new Date(test.scheduled_datetime).toLocaleString(
                            "en-PK",
                            {
                              timeZone: "Asia/Karachi",
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
