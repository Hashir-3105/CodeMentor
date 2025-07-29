import React, { useEffect, useState } from "react";
import useAssignTestStore from "@/store/useAssignTestStore";
import { supabase } from "@/lib/supabaseClient";

function CountDown({ testId, durationInMinutes, isStarted }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [finished, setFinished] = useState(false);
  const { updateTestStatus } = useAssignTestStore();

  useEffect(() => {
    const fetchStartTime = async () => {
      if (!testId) return;

      const { data } = await supabase
        .from("test_assign_submissions")
        .select("started_at, status")
        .eq("id", testId)
        .single();

      if (data?.status === "Completed") {
        setTimeLeft(0);
        setFinished(true);
        return;
      }

      if (!isStarted) {
        setTimeLeft(durationInMinutes * 60 * 1000);
        return;
      }

      let startTime = data?.started_at
        ? new Date(data.started_at).getTime()
        : Date.now();

      if (!data?.started_at) {
        await supabase
          .from("test_assign_submissions")
          .update({ started_at: new Date().toISOString() })
          .eq("id", testId);
      }

      const endTime = startTime + durationInMinutes * 60 * 1000;

      if (endTime <= Date.now()) {
        setTimeLeft(0);
        setFinished(true);
        updateTestStatus(testId, "Completed");
        return;
      }

      setTimeLeft(endTime - Date.now());

      const interval = setInterval(() => {
        const remaining = endTime - Date.now();
        if (remaining <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
          setFinished(true);
          updateTestStatus(testId, "Completed");
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    };

    fetchStartTime();
  }, [isStarted, testId, durationInMinutes]);

  const formatTime = (ms) => {
    if (ms === null) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 font-mono">
        {finished ? "00:00:00" : formatTime(timeLeft)}
      </p>
    </div>
  );
}

export default CountDown;
