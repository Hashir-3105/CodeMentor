import React from "react";
import useCandidatesStore from "@/store/useCandidatesStore";
import { Clock, Users, Code, ClockArrowUp } from "lucide-react";
export function useAdminManagement() {
  const { candidates, filteredCandidates } = useCandidatesStore();
  const totalCandidates = candidates.length;
  const pendingCandidates = filteredCandidates.length;
  const dispayCardData = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      status: "Active Candidates",
      count: totalCandidates,
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      status: "Tests in Progress",
      count: 0,
    },
    {
      icon: <ClockArrowUp className="h-8 w-8 text-purple-600" />,
      status: "Pending",
      count: pendingCandidates,
    },
    {
      icon: <Code className="h-8 w-8 text-green-600" />,
      status: "Completed Today",
      count: 0,
    },
  ];
  return { dispayCardData };
}
