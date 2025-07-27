
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  fixAndExplainCode,
  FixAndExplainCodeOutput,
} from "@/ai/flows/fix-and-explain-code";
import { 
    translateCode,
    TranslateCodeOutput
} from "@/ai/flows/translate-code";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Loader2, Languages, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const languages = ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go", "Rust"];

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
  const [loading, setLoading] = useState<"fix" | "translate" | false>(false);
  const [code, setCode] = useState(defaultCode);
  const [sourceLang, setSourceLang] = useState("JavaScript");
  const [targetLang, setTargetLang] = useState("Python");
  const [result, setResult] = useState<FixAndExplainCodeOutput | TranslateCodeOutput | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const { toast } = useToast();

  const handleAnalyzeCode = async () => {
    if (!code) return;

    setLoading("fix");
    setResult(null);
    setExplanation(null);
    try {
      const res = await fixAndExplainCode({ code });
      setResult(res);
      setExplanation(res.explanation);
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

  const handleTranslateCode = async () => {
    if (!code) return;

    setLoading("translate");
    setResult(null);
    setExplanation(null);
    try {
        const res = await translateCode({ code, sourceLanguage: sourceLang, targetLanguage: targetLang });
        setResult(res);
        setExplanation(`Đoạn mã đã được dịch từ ${sourceLang} sang ${targetLang}.`);
    } catch (error) {
        console.error("Failed to translate code:", error);
        toast({
            title: "Lỗi",
            description: "Không thể dịch mã. Vui lòng thử lại.",
            variant: "destructive",
        });
    } finally {
        setLoading(false);
    }
  }

  const getOutputCode = () => {
    if (!result) return "";
    if ('fixedCode' in result) return result.fixedCode;
    if ('translatedCode' in result) return result.translatedCode;
    return "";
  }

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
            disabled={!!loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="output-code">Mã đã sửa / dịch</Label>
          <Textarea
            id="output-code"
            value={getOutputCode()}
            readOnly
            placeholder="Kết quả sẽ xuất hiện ở đây..."
            className="h-48 bg-muted font-mono text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={handleAnalyzeCode} disabled={!!loading || !code}>
          {loading === 'fix' ? (
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
        
        <div className="flex items-center gap-2">
            <Select onValueChange={setSourceLang} defaultValue={sourceLang} disabled={!!loading}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Ngôn ngữ gốc" />
                </SelectTrigger>
                <SelectContent>
                    {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                </SelectContent>
            </Select>
            <ArrowRight className="h-4 w-4 text-muted-foreground"/>
             <Select onValueChange={setTargetLang} defaultValue={targetLang} disabled={!!loading}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Ngôn ngữ đích" />
                </SelectTrigger>
                <SelectContent>
                    {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

         <Button onClick={handleTranslateCode} disabled={!!loading || !code || sourceLang === targetLang} variant="outline">
          {loading === 'translate' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang dịch...
            </>
          ) : (
            <>
              <Languages className="mr-2 h-4 w-4" />
              Dịch mã
            </>
          )}
        </Button>
      </div>
      {explanation && (
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 flex items-center font-semibold">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Giải thích từ AI
            </h3>
            <p className="text-sm text-muted-foreground">{explanation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
