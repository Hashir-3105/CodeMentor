import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CountDownTimer({
  testId,
  durationInMinutes,
  onTimeUp,
}) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!testId || !durationInMinutes) return;
    const fetchStartTime = async () => {
      if (!testId) return;

      const { data } = await supabase
        .from("test_assign_submissions")
        .select("started_at, status")
        .eq("id", testId)
        .single();

      if (data?.status === "Completed") {
        setTimeRemaining(0);
        setFinished(true);
        onTimeUp?.();
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
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

      setTimeRemaining(remaining);

      if (remaining === 0) {
        setFinished(true);
        onTimeUp?.();
      }
    };

    fetchStartTime();
  }, [testId, durationInMinutes]);

  useEffect(() => {
    if (timeRemaining === null || finished) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setFinished(true);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, finished]);

  return (
    <div className="flex justify-center items-center">
      <div className="text-5xl font-bold text-gray-900 dark:text-gray-50">
        {timeRemaining !== null
          ? `${Math.floor(timeRemaining / 60)}:${String(
              timeRemaining % 60
            ).padStart(2, "0")}`
          : "Loading..."}
      </div>
    </div>
  );
}
