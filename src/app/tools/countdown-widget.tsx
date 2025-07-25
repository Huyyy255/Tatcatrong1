"use client";

import { useState, useEffect } from "react";

// Đặt ngày mục tiêu cho đồng hồ đếm ngược (ví dụ: Năm mới)
const targetDate = new Date(`January 1, ${new Date().getFullYear() + 1} 00:00:00`);

export default function CountdownWidget() {
  const [timeLeft, setTimeLeft] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }>({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeftData = {};

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeftData;
    };

    // Đặt thời gian ban đầu trên máy khách
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const intervalMapping: { [key: string]: string } = {
    days: "ngày",
    hours: "giờ",
    minutes: "phút",
    seconds: "giây",
  };

  return (
    <div className="flex space-x-2 text-center">
      {Object.entries(timeLeft).length > 0 ? (
        Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums">{value}</span>
            <span className="text-xs uppercase text-muted-foreground">
              {intervalMapping[interval]}
            </span>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">Sự kiện đã qua!</p>
      )}
    </div>
  );
}
