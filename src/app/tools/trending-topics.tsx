"use client";

import { useState } from "react";
import {
  suggestTrendingTopics,
  SuggestTrendingTopicsOutput,
} from "@/ai/flows/suggest-trending-topics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Danh sách giả các bài viết trước đây để cung cấp cho AI
const pastArticles = [
  "Làm chủ Next.js 14: Đi sâu vào App Router",
  "Firebase cho người mới bắt đầu: Auth, Firestore và Storage",
  "Nghệ thuật của Tailwind CSS: Mẹo và thủ thuật",
];

export default function TrendingTopics() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] =
    useState<SuggestTrendingTopicsOutput | null>(null);
  const { toast } = useToast();

  const handleSuggestTopics = async () => {
    setLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestTrendingTopics({ pastArticles });
      setSuggestions(result);
    } catch (error) {
      console.error("Không thể đề xuất chủ đề:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tìm nạp đề xuất chủ đề. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Nhận đề xuất chủ đề blog được hỗ trợ bởi AI dựa trên các bài viết trước đây của bạn.
      </p>
      <div className="flex items-center gap-4">
        <Button onClick={handleSuggestTopics} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang tạo...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Gợi ý chủ đề
            </>
          )}
        </Button>
      </div>

      {suggestions && suggestions.suggestedTopics.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 font-semibold">Đây là một vài ý tưởng:</h3>
          <Card>
            <CardContent className="p-4">
              <ul className="list-inside list-disc space-y-2">
                {suggestions.suggestedTopics.map((topic, index) => (
                  <li key={index} className="text-foreground/80">
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
