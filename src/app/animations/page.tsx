
"use client";

import { useState, useRef } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useMotionValue, useTransform } from "framer-motion";

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

function SliderButton() {
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

function DraggableCard() {
    const constraintsRef = useRef(null);

    return (
        <motion.div ref={constraintsRef} className="w-full h-48 rounded-lg border-2 border-dashed flex items-center justify-center">
             <motion.div
                drag
                dragConstraints={constraintsRef}
                whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                className="w-24 h-24 rounded-lg bg-primary shadow-xl flex items-center justify-center cursor-grab"
            >
                <span className="text-sm font-bold text-primary-foreground">Kéo tôi</span>
            </motion.div>
        </motion.div>
    );
}


function Card3D() {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-150, 150], [15, -15]);
    const rotateY = useTransform(x, [-150, 150], [-15, 15]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const mouseX = event.clientX - left - width / 2;
        const mouseY = event.clientY - top - height / 2;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "1000px",
            }}
            className="w-full h-48 rounded-lg border-2 border-dashed flex items-center justify-center"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-48 h-32 rounded-lg bg-primary shadow-2xl flex flex-col items-center justify-center text-primary-foreground"
            >
                <h3 className="text-lg font-bold" style={{ transform: "translateZ(20px)" }}>Hiệu ứng 3D</h3>
                <p className="text-xs" style={{ transform: "translateZ(10px)" }}>Di chuột qua tôi</p>
            </motion.div>
        </motion.div>
    )
}

function StaggeredList() {
    const items = ["Mục 1", "Mục 2", "Mục 3", "Mục 4"];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
        >
            {items.map((item, index) => (
                <motion.li
                    key={index}
                    variants={itemVariants}
                    className="p-3 bg-muted rounded-md"
                >
                    {item}
                </motion.li>
            ))}
        </motion.ul>
    );
}


export default function AnimationsPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight">
                    Trưng bày hoạt ảnh
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Một bộ sưu tập các hiệu ứng và hoạt ảnh giao diện người dùng tùy chỉnh.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <Card>
                    <CardHeader>
                        <CardTitle>Nút trượt</CardTitle>
                        <CardDescription>Hiệu ứng trượt mượt mà sử dụng Framer Motion `layout`.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
                            <SliderButton />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Thẻ kéo thả</CardTitle>
                        <CardDescription>Kéo thả thẻ xung quanh trong khu vực giới hạn.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <DraggableCard />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Hiệu ứng 3D khi di chuột</CardTitle>
                        <CardDescription>Thẻ sẽ nghiêng theo con trỏ chuột của bạn.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Card3D />
                    </CardContent>
                </Card>
                 <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Danh sách xuất hiện tuần tự</CardTitle>
                        <CardDescription>Các mục trong danh sách xuất hiện lần lượt với hiệu ứng.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <div className="p-4 rounded-lg border-2 border-dashed">
                             <StaggeredList />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
