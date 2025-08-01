
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allPosts } from "@/lib/posts";
import { ArrowRight, CodeXml, Newspaper, Cake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useRef } from "react";
import BirthdayExperience from "./birthday-experience";
import TechList from "@/components/tech-list";
import AnimatedBackground from "@/components/animated-background";
import { motion, useMotionValue, useTransform } from "framer-motion";

const featuredProjects = [
    {
      title: "Nền Tảng Thương Mại Điện Tử",
      description:
        "Một trang web thương mại điện tử đầy đủ tính năng với quản lý sản phẩm, giỏ hàng và tích hợp Stripe.",
      image: "https://placehold.co/600x400.png",
      tags: ["Next.js", "Firebase", "Stripe"],
      aiHint: "online store",
    },
    {
      title: "Ứng Dụng Quản Lý Công Việc",
      description:
        "Một trình quản lý công việc cộng tác với cập nhật thời gian thực và xác thực người dùng.",
      image: "https://placehold.co/600x400.png",
      tags: ["React", "Firestore", "Auth"],
      aiHint: "kanban board",
    },
]

function Hero3DCard() {
    const { theme } = useTheme();
    const [startBirthdayExperience, setStartBirthdayExperience] = useState(false);
    const isBirthdayTheme = theme === "birthday";

    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-200, 200], [10, -10]);
    const rotateY = useTransform(x, [-200, 200], [-10, 10]);

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
        <>
        {isBirthdayTheme && startBirthdayExperience && <BirthdayExperience />}
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "2000px",
            }}
            className="w-full flex items-center justify-center text-center"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full max-w-2xl rounded-3xl p-8 md:p-12"
            >
                <div style={{ transform: "translateZ(40px)" }}>
                    <h1 className="font-headline text-5xl font-bold tracking-tight">
                    {isBirthdayTheme ? "Chúc mừng sinh nhật, Huy!" : "All-in-One Personal Hub"}
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground" style={{ transform: "translateZ(20px)" }}>
                    {isBirthdayTheme 
                        ? "Đây là một ngày đặc biệt! Hôm nay là ngày của bạn. Chúc bạn một tuổi mới tràn đầy niềm vui, thành công và những dòng code đẹp."
                        : "Một trung tâm cá nhân để giới thiệu dự án, viết blog và sử dụng các công cụ tiện ích."
                    }
                    </p>
                </div>
                <div className="mt-8 flex justify-center gap-4" style={{ transform: "translateZ(60px)" }}>
                    {isBirthdayTheme ? (
                        <Button size="lg" onClick={() => setStartBirthdayExperience(true)} disabled={startBirthdayExperience}>
                        <Cake className="mr-2"/>
                        {startBirthdayExperience ? "Chúc mừng!" : "Thổi nến!"}
                        </Button>
                    ) : (
                        <>
                        <Button size="lg" asChild>
                            <Link href="/portfolio">
                                <CodeXml className="mr-2"/>
                                Xem dự án
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/blog">
                                <Newspaper className="mr-2"/>
                                Đọc blog
                            </Link>
                        </Button>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
        </>
    )
}

export default function Home() {
  const recentPosts = allPosts.slice(0, 2);

  return (
    <div className="relative">
      <AnimatedBackground />
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8">
      
      <section className="mb-16 text-center py-16">
        <Hero3DCard />
      </section>
      
      <section className="mb-16">
        <h2 className="font-headline mb-8 text-center text-3xl font-bold">Công nghệ cốt lõi</h2>
        <div className="mx-auto max-w-md">
            <TechList />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-headline mb-8 text-center text-3xl font-bold">Dự án nổi bật</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
                <Card key={project.title}>
                     <CardHeader className="p-0">
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="h-auto w-full object-cover rounded-t-2xl"
                            data-ai-hint={project.aiHint}
                        />
                    </CardHeader>
                    <CardContent className="flex-grow p-6">
                        <CardTitle className="font-headline mb-2">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                         <Link href="/portfolio" className="flex items-center text-sm text-primary hover:underline">
                            Xem chi tiết <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline mb-8 text-center text-3xl font-bold">Bài viết gần đây</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
           {recentPosts.map((post) => (
             <Card key={post.slug}>
                 <Link href={`/blog/${post.slug}`} className="block">
                     <CardHeader className="p-0">
                         <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="aspect-video h-auto w-full object-cover rounded-t-2xl"
                            data-ai-hint={post.aiHint}
                         />
                     </CardHeader>
                    <CardContent className="flex-grow p-6">
                        <CardTitle className="font-headline mb-2 text-lg leading-snug">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                    </CardContent>
                 </Link>
                 <CardFooter className="flex items-center justify-between p-6 pt-0 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <Link href={`/blog/${post.slug}`} className="flex items-center text-primary hover:underline">
                        Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </CardFooter>
             </Card>
           ))}
        </div>
      </section>
    </div>
    </div>
  );
}
