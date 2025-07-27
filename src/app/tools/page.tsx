
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { BrainCircuit, Clock, Code, FileCode, Timer, GitCompare } from "lucide-react";
import ClockWidget from "./clock-widget";
import CountdownWidget from "./countdown-widget";
import TrendingTopics from "./trending-topics";
import CodeFixer from "./code-fixer";
import LiveCodePreview from "./live-code-preview";
import CodeComparator from "./code-comparator";
import { AdvancedSearch } from "./advanced-search";


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
        <div className="lg:col-span-3">
            <AdvancedSearch />
        </div>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
                <GitCompare className="h-6 w-6 text-primary" />
                <CardTitle>So sánh phiên bản Code</CardTitle>
            </div>
            <CardDescription>
                Dán hai phiên bản code và để AI giải thích sự khác biệt giữa chúng, giúp bạn hiểu rõ những thay đổi một cách nhanh chóng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeComparator />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                <CardTitle>Trình sửa lỗi và Dịch mã</CardTitle>
            </div>
            <CardDescription>
                Dán đoạn mã của bạn vào đây, AI sẽ tìm lỗi, sửa chúng, giải thích và thậm chí dịch sang ngôn ngữ khác.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeFixer />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
                <FileCode className="h-6 w-6 text-primary" />
                <CardTitle>Xem trước Code trực tiếp</CardTitle>
            </div>
            <CardDescription>
                Thử nghiệm nhanh các đoạn mã HTML, CSS và JavaScript và xem kết quả ngay lập tức mà không cần rời khỏi trang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LiveCodePreview />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-8 lg:col-span-3">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-primary" />
                    <CardTitle>Đồng hồ</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-center pt-4">
                    <ClockWidget />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                    <Timer className="h-6 w-6 text-primary" />
                    <CardTitle>Đếm ngược</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-center pt-4">
                    <CountdownWidget />
                </CardContent>
            </Card>
        </div>
       
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <CardTitle>Gợi ý chủ đề</CardTitle>
            </div>
            <CardDescription>
              Nhận các gợi ý chủ đề blog thịnh hành từ AI dựa trên các bài viết trước đây của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrendingTopics />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
