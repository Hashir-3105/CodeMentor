import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CountdownToInterview({ scheduledDateTime }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [ready, setReady] = useState(false);

  function getTimeLeft() {
    const now = new Date().getTime();
    const target = new Date(scheduledDateTime).getTime();
    const difference = target - now;
    return difference > 0 ? difference : 0;
  }

  useEffect(() => {
    if (ready) return;
    const interval = setInterval(() => {
      const remaining = getTimeLeft();
      setTimeLeft(remaining);
      if (remaining === 0) setReady(true);
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
        <Link
          to={"/user/editor"}
          className="mt-2 cursor-pointer text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition"
        >
          Start Interview
        </Link>
      )}
    </div>
  );
}

export default CountdownToInterview;
