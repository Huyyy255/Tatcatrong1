
"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Download, Palette, ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateImage, GenerateImageOutput } from "@/ai/flows/generate-image";
import { useToast } from "@/hooks/use-toast";


const memeTemplates = [
    { name: 'Distracted Boyfriend', src: 'https://placehold.co/500x334.png', hint: 'distracted boyfriend' },
    { name: 'Doge', src: 'https://placehold.co/500x375.png', hint: 'doge meme' },
    { name: 'Two Buttons', src: 'https://placehold.co/400x310.png', hint: 'two buttons' },
    { name: 'Drake Hotline Bling', src: 'https://placehold.co/500x500.png', hint: 'drake hotline bling' },
    { name: 'Is This A Pigeon?', src: 'https://placehold.co/600x336.png', hint: 'is this a pigeon' },
    { name: 'Woman Yelling at Cat', src: 'https://placehold.co/600x338.png', hint: 'woman yelling cat' },
];

function MemeCreator() {
    const [topText, setTopText] = useState('Văn bản trên');
    const [bottomText, setBottomText] = useState('Văn bản dưới');
    const [selectedTemplate, setSelectedTemplate] = useState(memeTemplates[0]);
    const memeRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        if (!memeRef.current) return;
        
        html2canvas(memeRef.current, { 
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
         }).then(canvas => {
            const link = document.createElement('a');
            link.download = \`\${selectedTemplate.name.toLowerCase().replace(/ /g, '-')}-meme.png\`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Bảng điều khiển</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input 
                            placeholder="Văn bản trên"
                            value={topText}
                            onChange={(e) => setTopText(e.target.value)}
                        />
                        <Input 
                            placeholder="Văn bản dưới"
                            value={bottomText}
                            onChange={(e) => setBottomText(e.target.value)}
                        />
                        <Button onClick={handleDownload} className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Tải Meme xuống
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Chọn Mẫu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72 w-full">
                            <div className="space-y-4 pr-4">
                            {memeTemplates.map(template => (
                                <button 
                                    key={template.name}
                                    onClick={() => setSelectedTemplate(template)}
                                    className={cn(
                                        "block w-full rounded-lg border-2 p-1 transition-all",
                                        selectedTemplate.src === template.src ? 'border-primary shadow-lg' : 'border-transparent hover:border-primary/50'
                                    )}
                                >
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image 
                                            src={template.src} 
                                            alt={template.name}
                                            fill
                                            className="rounded-md object-cover"
                                            data-ai-hint={template.hint}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm font-medium">{template.name}</p>
                                </button>
                            ))}
                            </div>
                            <ScrollBar />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2">
                <Card className="sticky top-20">
                    <CardHeader>
                        <CardTitle>Xem trước Meme</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div 
                            ref={memeRef} 
                            className="relative mx-auto w-full select-none overflow-hidden bg-muted"
                            style={{ aspectRatio: '1 / 1' }} 
                        >
                            <Image 
                                src={selectedTemplate.src} 
                                alt={selectedTemplate.name}
                                fill
                                className="object-contain"
                                data-ai-hint={selectedTemplate.hint}
                                priority
                            />
                            <div 
                                className="absolute left-1/2 top-4 w-11/12 -translate-x-1/2 break-words text-center font-black uppercase text-white"
                                style={{ WebkitTextStroke: '2px black', fontSize: 'clamp(1rem, 8vw, 2.5rem)', lineHeight: '1.1' }}
                            >
                                {topText}
                            </div>
                            <div 
                                className="absolute bottom-4 left-1/2 w-11/12 -translate-x-1/2 break-words text-center font-black uppercase text-white"
                                style={{ WebkitTextStroke: '2px black', fontSize: 'clamp(1rem, 8vw, 2.5rem)', lineHeight: '1.1' }}
                            >
                                {bottomText}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


function AiImageCreator() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("Một con mèo phi hành gia trên mặt trăng");
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
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
            <CardTitle>Trình tạo ảnh bằng AI</CardTitle>
            <CardDescription>Biến ý tưởng của bạn thành hình ảnh. Nhập một mô tả văn bản và để AI tạo ra một hình ảnh độc đáo cho bạn.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                <div className="relative aspect-square">
                    <Image
                        src={result.imageDataUri}
                        alt={prompt}
                        fill
                        className="rounded-md object-contain"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-4 right-4 bg-background/50"
                        asChild
                    >
                        <a href={result.imageDataUri} download={\`\${prompt}.png\`}>
                        <Download />
                        </a>
                    </Button>
                </div>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function MemePage() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight">
                    Tạo ảnh & Meme tiện ích
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Sử dụng các mẫu có sẵn hoặc để AI tạo ra những hình ảnh độc đáo.
                </p>
            </div>
             <Tabs defaultValue="meme" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
                    <TabsTrigger value="meme">Tạo Meme</TabsTrigger>
                    <TabsTrigger value="ai">Tạo ảnh bằng AI</TabsTrigger>
                </TabsList>
                <TabsContent value="meme" className="mt-6">
                    <MemeCreator />
                </TabsContent>
                <TabsContent value="ai" className="mt-6">
                    <AiImageCreator />
                </TabsContent>
            </Tabs>
        </div>
    );
}
