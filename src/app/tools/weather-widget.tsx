
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
import { Cloud, CloudRain, CloudSun as CloudSunIcon, Sun, Zap } from "lucide-react";


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

// NOTE: In a real app, you would fetch this from a weather API.
// For this demo, we're using static data to avoid API key management.
const mockWeatherData: { [key: string]: { temperature: string; condition: string; conditionKey: 'cloudy' | 'sunny' | 'partly-cloudy' | 'rainy' | 'stormy' } } = {
    "Hà Nội": { temperature: "28", condition: "Nhiều mây", conditionKey: "cloudy" },
    "TP. Hồ Chí Minh": { temperature: "32", condition: "Nắng gắt", conditionKey: "sunny" },
    "Đà Nẵng": { temperature: "30", condition: "Mây rải rác", conditionKey: "partly-cloudy" },
    "Cần Thơ": { temperature: "31", condition: "Có mưa rào", conditionKey: "rainy" },
    "Hải Phòng": { temperature: "29", condition: "Có dông", conditionKey: "stormy" },
    "Thanh Hóa": { temperature: "27", condition: "Nắng nhẹ", conditionKey: "partly-cloudy" },
};

const weatherIcons = {
    "sunny": Sun,
    "cloudy": Cloud,
    "partly-cloudy": CloudSunIcon,
    "rainy": CloudRain,
    "stormy": Zap,
};

function WeatherCard({ city, data }: { city: string; data: { temperature: string; condition: string; conditionKey: keyof typeof weatherIcons } }) {
  const Icon = weatherIcons[data.conditionKey] || Sun;
  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                     <p className="font-bold text-xl">{data.temperature}°C</p>
                     <p className="text-sm text-muted-foreground">{data.condition}</p>
                </div>
            </div>
        </div>
    </div>
  );
}


export default function WeatherWidget() {
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("Thanh Hóa");

  const weatherData = mockWeatherData[selectedCity] || {
    temperature: (Math.floor(Math.random() * 10) + 25).toString(), // Random temp
    condition: "Trời quang",
    conditionKey: "sunny",
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
            <SelectTrigger className="w-full">
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
            <div className="space-y-2 pt-4">
              <Skeleton className="h-10 w-full" />
            </div>
        ) : (
            <WeatherCard city={selectedCity} data={weatherData} />
        )}
    </div>
  );
}
