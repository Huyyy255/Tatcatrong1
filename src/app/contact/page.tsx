
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Thành công!",
        description: "Tin nhắn của bạn đã được gửi. Tôi sẽ sớm liên hệ lại với bạn.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <>
      <LoadingOverlay show={loading} />
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Liên hệ với tôi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Có một dự án hay ý tưởng? Hãy chia sẻ với tôi.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gửi tin nhắn</CardTitle>
            <CardDescription>
              Điền vào biểu mẫu bên dưới và tôi sẽ trả lời bạn sớm nhất có thể.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tên của bạn</Label>
                <Input id="name" name="name" placeholder="John Doe" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Địa chỉ email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Tin nhắn</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hãy bắt đầu cuộc trò chuyện..."
                  required
                  rows={5}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <Send className="mr-2 h-4 w-4" /> Gửi tin nhắn
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
