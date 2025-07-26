
"use client";

import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function AnimatedToggle() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="flex items-center space-x-2">
            <Switch 
                id="animated-toggle" 
                checked={isOn}
                onCheckedChange={setIsOn}
            />
            <Label htmlFor="animated-toggle">
                {isOn ? "Bật" : "Tắt"}
            </Label>
        </div>
    );
}

export default function AnimationsPage() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight">
                    Trưng bày hoạt ảnh
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Một bộ sưu tập các hiệu ứng và hoạt ảnh giao diện người dùng tùy chỉnh.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Công tắc chuyển đổi</CardTitle>
                    <CardDescription>
                        Một công tắc chuyển đổi đơn giản sử dụng component Switch của ShadCN/UI.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
                         <AnimatedToggle />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
