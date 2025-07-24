"use client";

import { useState, useEffect } from "react";

// Set a target date for the countdown (e.g., New Year's)
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

    // Set initial time on client
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex space-x-2 text-center">
      {Object.entries(timeLeft).length > 0 ? (
        Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums">{value}</span>
            <span className="text-xs uppercase text-muted-foreground">
              {interval}
            </span>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">Event has passed!</p>
      )}
    </div>
  );
}
