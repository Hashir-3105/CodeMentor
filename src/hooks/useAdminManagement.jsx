import React from "react";
import useCandidatesStore from "@/store/useCandidatesStore";
import useAssignTestStore from "@/store/useAssignTestStore";
import { Clock, Users, Code, ClockArrowUp } from "lucide-react";
export function useAdminManagement() {
  const { assignedTest } = useAssignTestStore();
  const { candidates, filteredCandidates } = useCandidatesStore();
  const totalCandidates = candidates.length;
  // const pendingCandidates = filteredCandidates.length;
  const inProgressTests = assignedTest.filter(
    (test) => test.status === "in-progress"
  );
  const completedTest = assignedTest.filter(
    (test) => test.status === "Completed"
  );
  const pendingTest = assignedTest.filter((test) => test.status === "pending");

  const dispayCardData = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      status: "Active Candidates",
      count: totalCandidates,
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      status: "Tests in Progress",
      count: inProgressTests.length,
    },
    {
      icon: <ClockArrowUp className="h-8 w-8 text-purple-600" />,
      status: "Pending",
      count: pendingTest.length,
    },
    {
      icon: <Code className="h-8 w-8 text-green-600" />,
      status: "Completed Today",
      count: completedTest.length,
    },
  ];
  return { dispayCardData };
}
