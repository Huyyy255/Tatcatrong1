import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { BrainCircuit, Clock, CloudSun, Code, ImageIcon, Timer } from "lucide-react";
import WeatherWidget from "./weather-widget";
import ClockWidget from "./clock-widget";
import CountdownWidget from "./countdown-widget";
import TrendingTopics from "./trending-topics";
import ImageGenerator from "./image-generator";
import CodeFixer from "./code-fixer";

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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                <CardTitle>Trình sửa lỗi và giải thích mã</CardTitle>
            </div>
            <CardDescription>
                Dán đoạn mã của bạn vào đây, AI sẽ tìm lỗi, sửa chúng và giải thích cho bạn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeFixer />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
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

        <div className="grid grid-cols-2 gap-8 md:col-span-2">
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

        <Card className="md:col-span-2 lg:col-span-3">
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
