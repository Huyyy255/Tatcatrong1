
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  fixAndExplainCode,
  FixAndExplainCodeOutput,
} from "@/ai/flows/fix-and-explain-code";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Wand2, Loader2, FileCode, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const defaultCode = `
import { useState } from "react";
import { motion } from "framer-motion";

export default function SliderButton() {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      onClick={() => setToggled(!toggled)}
      className="relative w-24 h-12 bg-muted rounded-full cursor-pointer p-1 shadow-inner"
    >
      <motion.div
        className="w-10 h-10 bg-background rounded-full shadow-lg"
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
        animate={{
          x: toggled ? 48 : 0,
        }}
        whileTap={{ scale: 0.9 }}
      />
    </div>
  );
}
`.trim();

export default function CodeFixer() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(defaultCode);
  const [result, setResult] = useState<FixAndExplainCodeOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyzeCode = async () => {
    if (!code) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fixAndExplainCode({ code });
      setResult(res);
    } catch (error) {
      console.error("Failed to fix code:", error);
      toast({
        title: "Lỗi",
        description: "Không thể phân tích mã. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input-code">Mã gốc</Label>
          <Textarea
            id="input-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập hoặc dán mã của bạn vào đây..."
            className="h-48 font-mono text-sm"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="output-code">Mã đã sửa</Label>
          <Textarea
            id="output-code"
            value={result?.fixedCode ?? ""}
            readOnly
            placeholder="Mã đã được sửa lỗi sẽ xuất hiện ở đây..."
            className="h-48 bg-muted font-mono text-sm"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleAnalyzeCode} disabled={loading || !code}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang phân tích...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Phân tích & Sửa lỗi
            </>
          )}
        </Button>
      </div>
      {result && (
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 flex items-center font-semibold">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Giải thích từ AI
            </h3>
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
