import { useAdminManagement } from "@/hooks/useAdminManagement";
import DashboardSummary from "./DashboardSummary";
import AssessmentMonitor from "./AssessmentMonitor";

export default function Management() {
  const { dispayCardData, navigate, hasFetch, assignedTest } =
    useAdminManagement();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <DashboardSummary dispayCardData={dispayCardData} />
      <AssessmentMonitor
        navigate={navigate}
        hasFetch={hasFetch}
        assignedTest={assignedTest}
      />
    </div>
  );
}
