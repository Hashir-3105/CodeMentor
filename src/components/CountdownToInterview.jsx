import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAssignTestStore from "@/store/useAssignTestStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
function CountdownToInterview({ scheduledDateTime, testId, testStatus }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [ready, setReady] = useState(false);
  const { updateTestStatus } = useAssignTestStore();
  const navigate = useNavigate();
  function getTimeLeft() {
    const now = new Date().getTime();
    const target = new Date(scheduledDateTime).getTime();
    const difference = target - now;
    return difference > 0 ? difference : 0;
  }
  useEffect(() => {
    const remaining = getTimeLeft();
    setTimeLeft(remaining);

    if (remaining <= 0) {
      setReady(true);
      return;
    }

    const interval = setInterval(() => {
      const r = getTimeLeft();
      setTimeLeft(r);
      if (r <= 0) {
        clearInterval(interval);
        setReady(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [scheduledDateTime]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  return (
    <div className="mt-4 text-center">
      {!ready ? (
        <p className="text-sm text-gray-500">
          Starts in{" "}
          <span className="font-mono text-blue-600">
            {formatTime(timeLeft)}
          </span>
        </p>
      ) : (
        <Button
          onClick={() => {
            if (testStatus === "Completed" || testStatus === "in-progress")
              return;
            updateTestStatus(testId, "in-progress");
            navigate(`/user/editor/${testId}`);
          }}
          className={`mt-2 text-sm px-4 py-1.5 rounded-md transition ${
            testStatus === "Completed" || testStatus === "in-progress"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {testStatus === "Completed"
            ? "Completed"
            : testStatus === "in-progress"
            ? "Test Started"
            : "Start Test"}
        </Button>
      )}
    </div>
  );
}

export default CountdownToInterview;
