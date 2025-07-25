"use client";

import { useEffect, useState } from "react";

// LƯU Ý: Trong một ứng dụng thực tế, bạn sẽ lấy dữ liệu này từ một API thời tiết.
// Đối với bản demo này, chúng tôi đang sử dụng dữ liệu tĩnh để tránh quản lý khóa API.
const weatherData = {
  city: "San Francisco",
  temperature: "18",
  condition: "Mây rải rác",
  icon: "⛅️",
};

export default function WeatherWidget() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng tìm nạp API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Đang tải thời tiết...</p>;
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-5xl">{weatherData.icon}</div>
      <div>
        <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
        <p className="text-muted-foreground">
          {weatherData.condition} tại {weatherData.city}
        </p>
      </div>
    </div>
  );
}
