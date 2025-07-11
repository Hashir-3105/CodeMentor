import React from "react";
import { Calendar, Clock, User, Briefcase } from "lucide-react";
import CountdownToInterview from "../CountdownToInterview";
import { interviews } from "@/Constants";

function InterviewSection() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Scheduled Interviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="p-5 bg-white rounded-xl shadow hover:shadow-md transition border"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {interview.position}
              </h3>
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
                  interview.status === "Scheduled"
                    ? "bg-blue-100 text-blue-800"
                    : interview.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {interview.status}
              </span>
            </div>

            <div className="text-gray-600 space-y-2 text-sm mb-4">
              <h1 className="font-bold">Room : {interview.room}</h1>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {interview.date}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {interview.time}
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {interview.interviewer}
              </p>
              <p className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {interview.position}
              </p>
            </div>

            {interview.status === "Scheduled" && (
              <CountdownToInterview
                scheduledDateTime={interview.scheduledDateTime}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewSection;
