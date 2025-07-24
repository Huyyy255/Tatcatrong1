"use client";

import { useEffect, useState } from "react";

// NOTE: In a real app, you would fetch this data from a weather API.
// For this demo, we're using static data to avoid API key management.
const weatherData = {
  city: "San Francisco",
  temperature: "18",
  condition: "Partly Cloudy",
  icon: "⛅️",
};

export default function WeatherWidget() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading weather...</p>;
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-5xl">{weatherData.icon}</div>
      <div>
        <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
        <p className="text-muted-foreground">
          {weatherData.condition} in {weatherData.city}
        </p>
      </div>
    </div>
  );
}
