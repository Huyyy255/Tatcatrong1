"use client";

import { useState, useEffect } from "react";

export default function ClockWidget() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Đặt thời gian ban đầu trên máy khách
    setTime(new Date());

    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-2xl font-bold tabular-nums">
      {time ? time.toLocaleTimeString() : "Đang tải..."}
    </div>
  );
}
