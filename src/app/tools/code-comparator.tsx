
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { compareCode, CompareCodeOutput } from "@/ai/flows/compare-code";
import { useToast } from "@/hooks/use-toast";
import { GitCompare, Loader2, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const defaultCodeA = `
function sayHello(name) {
  console.log("Hello, " + name);
}

sayHello("World");
`.trim();

const defaultCodeB = `
function sayHello(name) {
  // Add a greeting message
  const greeting = \`Hello, \${name}!\`;
  console.log(greeting);
}

sayHello("World");
`.trim();


export default function CodeComparator() {
  const [loading, setLoading] = useState(false);
  const [codeA, setCodeA] = useState(defaultCodeA);
  const [codeB, setCodeB] = useState(defaultCodeB);
  const [result, setResult] = useState<CompareCodeOutput | null>(null);

  const { toast } = useToast();

  const handleCompareCode = async () => {
    if (!codeA || !codeB) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await compareCode({ codeA, codeB });
      setResult(res);
    } catch (error) {
      console.error("Failed to compare code:", error);
      toast({
        title: "Lỗi",
        description: "Không thể so sánh mã. Vui lòng thử lại.",
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
          <Label htmlFor="code-a-input">Phiên bản A</Label>
          <Textarea
            id="code-a-input"
            value={codeA}
            onChange={(e) => setCodeA(e.target.value)}
            placeholder="Dán phiên bản code đầu tiên vào đây..."
            className="h-48 font-mono text-sm"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code-b-input">Phiên bản B</Label>
          <Textarea
            id="code-b-input"
            value={codeB}
            onChange={(e) => setCodeB(e.target.value)}
            placeholder="Dán phiên bản code thứ hai vào đây..."
            className="h-48 font-mono text-sm"
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCompareCode} disabled={loading || !codeA || !codeB}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang so sánh...
            </>
          ) : (
            <>
              <GitCompare className="mr-2 h-4 w-4" />
              So sánh mã
            </>
          )}
        </Button>
      </div>
      {loading && (
        <div className="flex items-center justify-center pt-4">
             <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {result?.explanation && (
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 flex items-center font-semibold">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Phân tích từ AI
            </h3>
            <div 
                className="prose prose-sm dark:prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: result.explanation.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
