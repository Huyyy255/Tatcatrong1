
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Nền Tảng Thương Mại Điện Tử",
    description:
      "Một trang web thương mại điện tử đầy đủ tính năng với quản lý sản phẩm, giỏ hàng và tích hợp Stripe.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "Firebase", "Stripe", "Tailwind CSS"],
    github: "#",
    live: "#",
    aiHint: "online store",
  },
  {
    title: "Ứng Dụng Quản Lý Công Việc",
    description:
      "Một trình quản lý công việc cộng tác với cập nhật thời gian thực, bảng và xác thực người dùng.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "Firestore", "Auth", "Framer Motion"],
    github: "#",
    live: "#",
    aiHint: "kanban board",
  },
  {
    title: "Trình Tạo Nội Dung AI",
    description:
      "Một ứng dụng SaaS sử dụng AI tạo sinh để tạo bản sao tiếp thị và bài đăng blog.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "GenAI", "Vercel"],
    github: "#",
    live: "#",
    aiHint: "robot writing",
  },
  {
    title: "Portfolio Cá Nhân v1",
    description:
      "Trang web portfolio trước đây của tôi, được xây dựng bằng HTML, CSS và JavaScript đơn giản.",
    image: "https://placehold.co/600x400.png",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "#",
    live: "#",
    aiHint: "website design",
  },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Portfolio Của Tôi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Một tuyển tập các dự án mà tôi đã thực hiện.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="flex flex-col overflow-hidden"
          >
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
              <CardTitle className="font-headline mb-2">
                {project.title}
              </CardTitle>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 p-6 pt-0">
              <Button variant="outline" asChild>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
              <Button asChild>
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Demo trực tiếp
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
