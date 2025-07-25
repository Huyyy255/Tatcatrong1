"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  generateImage,
  GenerateImageOutput,
} from "@/ai/flows/generate-image";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Download, ImageIcon, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<GenerateImageOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await generateImage({ prompt });
      setResult(res);
    } catch (error) {
      console.error("Failed to generate image:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo ảnh. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleGenerateImage} className="flex items-center gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ví dụ: Một con mèo phi hành gia trên mặt trăng"
          className="flex-grow"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !prompt}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang tạo...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Tạo ảnh
            </>
          )}
        </Button>
      </form>
      <div className="mt-4">
        {loading && (
          <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span>AI đang vẽ...</span>
            </div>
          </div>
        )}
        {result?.imageDataUri && (
          <Card>
            <CardContent className="relative aspect-square p-2">
              <Image
                src={result.imageDataUri}
                alt={prompt}
                fill
                className="rounded-md object-contain"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-4 right-4"
                asChild
              >
                <a href={result.imageDataUri} download={`${prompt}.png`}>
                  <Download />
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
