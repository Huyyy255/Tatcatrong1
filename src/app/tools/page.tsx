import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Clock, CloudSun, ImageIcon, Timer } from "lucide-react";
import WeatherWidget from "./weather-widget";
import ClockWidget from "./clock-widget";
import CountdownWidget from "./countdown-widget";
import TrendingTopics from "./trending-topics";
import ImageGenerator from "./image-generator";

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Công cụ cá nhân
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Một bộ sưu tập các widget hữu ích và các công cụ được hỗ trợ bởi AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tạo ảnh bằng AI
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ImageGenerator />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Thời tiết hiện tại
            </CardTitle>
            <CloudSun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <WeatherWidget />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Đồng hồ thời gian thực
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ClockWidget />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Đếm ngược sự kiện
              </CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CountdownWidget />
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gợi ý chủ đề thịnh hành
            </CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <TrendingTopics />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
