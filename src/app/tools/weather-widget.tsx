
"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";


const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
    "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận",
    "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông",
    "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam",
    "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình",
    "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
    "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình",

    "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi",
    "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình",
    "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh",
    "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

// LƯU Ý: Trong một ứng dụng thực tế, bạn sẽ lấy dữ liệu này từ một API thời tiết.
// Đối với bản demo này, chúng tôi đang sử dụng dữ liệu tĩnh để tránh quản lý khóa API.
const mockWeatherData: { [key: string]: { temperature: string; condition: string; icon: string } } = {
    "Hà Nội": { temperature: "28", condition: "Nhiều mây", icon: "☁️" },
    "TP. Hồ Chí Minh": { temperature: "32", condition: "Nắng gắt", icon: "☀️" },
    "Đà Nẵng": { temperature: "30", condition: "Mây rải rác", icon: "⛅️" },
    "Cần Thơ": { temperature: "31", condition: "Có mưa rào", icon: "🌦️" },
    "Hải Phòng": { temperature: "29", condition: "Có dông", icon: "⛈️" },
};


export default function WeatherWidget() {
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("Hà Nội");

  const weatherData = mockWeatherData[selectedCity] || {
    temperature: (Math.floor(Math.random() * 10) + 25).toString(), // Random temp
    condition: "Trời quang",
    icon: "☀️",
  };


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCity]);


  return (
    <div className="space-y-4">
        <Select onValueChange={setSelectedCity} defaultValue={selectedCity}>
            <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Chọn tỉnh thành" />
            </SelectTrigger>
            <SelectContent>
                {provinces.map(province => (
                <SelectItem key={province} value={province}>
                    {province}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>

        {loading ? (
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
            </div>
        ) : (
             <div className="flex items-center space-x-4">
                <div className="text-5xl">{weatherData.icon}</div>
                <div>
                    <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                    <p className="text-muted-foreground">
                    {weatherData.condition} tại {selectedCity}
                    </p>
                </div>
            </div>
        )}
    </div>
  );
}

