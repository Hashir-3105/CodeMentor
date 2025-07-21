import React, { useEffect } from "react";
import { Calendar, Clock, User, Briefcase } from "lucide-react";
import CountdownToInterview from "@/components/CountdownToInterview";
import { interviews } from "@/lib/Constants";
import useAssignTestStore from "@/store/useAssignTestStore";
import { useUser } from "@clerk/clerk-react";
function InterviewSection() {
  const { assignedTest, fetchAssignedTest } = useAssignTestStore();
  const { user } = useUser();
  useEffect(() => {
    fetchAssignedTest(user?.id);
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Scheduled Interviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignedTest.length === 0 ? (
          <div className="col-span-full">
            <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition border flex flex-col items-center justify-center h-80 text-gray-500 text-lg font-medium">
              <Calendar className="w-6 h-6 mb-2 text-gray-400" />
              No interviews scheduled yet
            </div>
          </div>
        ) : (
          assignedTest.map((test) => (
            <div
              key={test.id}
              className="p-5 bg-white rounded-xl shadow hover:shadow-md transition border"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800">
                  {test.int_position}
                </h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    test.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : test.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {test.status}
                </span>
              </div>

              <div className="text-gray-600 space-y-2 text-sm mb-4">
                <h1 className="font-bold">{test.room_name}</h1>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {test.scheduled_at}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {test.time}
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {test.interviewer_name}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {test.int_position}
                </p>
              </div>

              {interviews.status === "Scheduled" && (
                <CountdownToInterview
                  scheduledDateTime={interviews.scheduledDateTime}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InterviewSection;
