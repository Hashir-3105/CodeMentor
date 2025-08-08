import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CountDown from "./CountDown";
import { Button } from "@/components/ui/button";

export default function AssessmentMonitor({
  hasFetch,
  assignedTest,
  navigate,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Assessment Monitor</CardTitle>
        <CardDescription>Real-time view of ongoing assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hasFetch && assignedTest.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              There are currently no assessments assigned to candidates.
            </p>
          ) : (
            assignedTest.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {test.candidate_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{test.candidate_name}</h3>
                    <p className="text-sm text-gray-600">{test.int_position}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <Badge
                    className={`${
                      test.status === "in-progress"
                        ? "bg-black text-white"
                        : test.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } w-[90px] py-1`}
                  >
                    {test.status}
                  </Badge>
                  <div className="text-sm text-gray-600 ">
                    <CountDown
                      testId={test.id}
                      isStarted={test.status === "in-progress"}
                      durationInMinutes={test.duration_minutes}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (test.status !== "in-progress") return;
                      navigate(`/admin/editor/${test.user_id}/${test.id}`);
                    }}
                    disabled={
                      test.status !== "in-progress" ||
                      test.status === "Completed"
                    }
                    size="sm"
                    variant="outline"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
