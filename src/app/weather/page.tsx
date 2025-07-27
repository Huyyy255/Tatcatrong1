
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
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


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

const hourlyData = [
    { time: 'Bây giờ', temp: 31 },
    { time: '11:00', temp: 32 },
    { time: '13:00', temp: 33 },
    { time: '15:00', temp: 32 },
    { time: '17:00', temp: 30 },
    { time: '19:00', temp: 29 },
];

type WeatherConditionKey = 'cloudy' | 'sunny' | 'partly-cloudy' | 'rainy' | 'stormy';
interface WeatherData {
    temperature: number;
    condition: string;
    conditionKey: WeatherConditionKey;
    uv: string;
    temp_min: number;
    temp_max: number;
    hourly: { time: string; temp: number }[];
}

const mockWeatherData: { [key: string]: WeatherData } = {
    "Hà Nội": { temperature: 28, condition: "Nhiều mây", conditionKey: "cloudy", uv: "Trung bình", temp_min: 26, temp_max: 30, hourly: hourlyData.map(h => ({...h, temp: h.temp - 3})) },
    "TP. Hồ Chí Minh": { temperature: 32, condition: "Nắng gắt", conditionKey: "sunny", uv: "Cao", temp_min: 28, temp_max: 34, hourly: hourlyData },
    "Đà Nẵng": { temperature: 30, condition: "Mây rải rác", conditionKey: "partly-cloudy", uv: "Cao", temp_min: 27, temp_max: 32, hourly: hourlyData.map(h => ({...h, temp: h.temp - 1})) },
    "Cần Thơ": { temperature: 31, condition: "Có mưa rào", conditionKey: "rainy", uv: "Thấp", temp_min: 27, temp_max: 32, hourly: hourlyData },
    "Hải Phòng": { temperature: 29, condition: "Có dông", conditionKey: "stormy", uv: "Thấp", temp_min: 26, temp_max: 30, hourly: hourlyData.map(h => ({...h, temp: h.temp - 2})) },
    "Thanh Hóa": { temperature: 27, condition: "Nắng nhẹ", conditionKey: "partly-cloudy", uv: "Trung bình", temp_min: 25, temp_max: 29, hourly: hourlyData.map(h => ({...h, temp: h.temp - 4})) },
};

const weatherIcons: Record<WeatherConditionKey, React.ElementType> = {
    "sunny": Sun,
    "cloudy": Cloud,
    "partly-cloudy": CloudSunIcon,
    "rainy": CloudRain,
    "stormy": Zap,
};

function WeatherCard({ city, data }: { city: string; data: WeatherData }) {
  const Icon = weatherIcons[data.conditionKey] || Sun;
  return (
     <Card className="relative overflow-hidden border-2 border-primary/20 bg-primary/10 p-6 shadow-lg">
        <div className="absolute -right-10 -top-10 text-primary/10">
            <Icon size={200} />
        </div>
        <div className="relative z-10 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xl font-bold">{city}</p>
                        <p className="text-muted-foreground">{data.condition}, {data.temp_min}°C / {data.temp_max}°C</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium">UV</p>
                        <p className="text-lg font-bold text-primary">{data.uv}</p>
                    </div>
                </div>
                 <div className="my-6">
                    <p className="text-7xl font-bold tracking-tighter">{data.temperature}<span className="align-super text-3xl">°C</span></p>
                </div>
            </div>
            
            <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data.hourly}
                        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                    >
                         <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="time" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                            dy={10}
                        />
                        <YAxis hide={true} domain={['dataMin - 2', 'dataMax + 2']} />
                         <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background) / 0.8)',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                                backdropFilter: 'blur(4px)',
                            }}
                            labelStyle={{ fontWeight: 'bold' }}
                            formatter={(value: number) => [`${value}°C`, 'Nhiệt độ']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="temp" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorTemp)"
                            dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </Card>
  );
}


export default function WeatherPage() {
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("TP. Hồ Chí Minh");

  const weatherData = mockWeatherData[selectedCity] || {
    temperature: Math.floor(Math.random() * 10) + 25,
    condition: "Trời quang",
    conditionKey: "sunny",
    uv: "Trung bình",
    temp_min: 24,
    temp_max: 32,
    hourly: hourlyData,
  };


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCity]);


  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight">
                Dự báo thời tiết
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Xem thông tin thời tiết hiện tại cho các tỉnh thành Việt Nam.
            </p>
        </div>

        <div className="space-y-4">
            <Select onValueChange={setSelectedCity} defaultValue={selectedCity}>
                <SelectTrigger>
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
                <Card className="h-[430px] w-full flex items-center justify-center">
                    <Skeleton className="h-full w-full" />
                </Card>
            ) : (
                <WeatherCard city={selectedCity} data={weatherData} />
            )}
        </div>
    </div>
  );
}
