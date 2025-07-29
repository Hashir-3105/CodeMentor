import React, { useEffect } from "react";
import { Calendar, Clock, User, Briefcase } from "lucide-react";
import CountdownToInterview from "@/components/CountdownToInterview";
import useAssignTestStore from "@/store/useAssignTestStore";
import { useUser } from "@clerk/clerk-react";
import InterviewSkeleton from "./InterviewSkeleton";

function TestSection() {
  const { assignedTest, fetchAssignedTest, loading, hasFetch } =
    useAssignTestStore();
  const { user } = useUser();
  useEffect(() => {
    fetchAssignedTest(user?.id);
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Scheduled Interviews
      </h2>

      {loading ? (
        <InterviewSkeleton />
      ) : hasFetch && assignedTest.length === 0 ? (
        <div className="flex justify-center items-center h-80">
          <div className="text-center text-gray-500">
            <Calendar className="w-10 h-10 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No interviews scheduled yet</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedTest.map((test) => (
            <div
              key={test.id}
              className="rounded-xl border bg-white p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {test.int_position}
                </h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold capitalize ${
                    test.status === "Scheduled"
                      ? "bg-blue-100 text-blue-700"
                      : test.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {test.status || "Scheduled"}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span>{test.int_position}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{test.interviewer_name}</span>
                </div> */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {new Date(test.scheduled_datetime).toLocaleString("en-PK", {
                      timeZone: "Asia/Karachi",
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{test.scheduled_time}</span>
                </div>
              </div>

              {test.scheduled_datetime && (
                <CountdownToInterview
                  scheduledDateTime={test.scheduled_datetime}
                  testId={test.id}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TestSection;
