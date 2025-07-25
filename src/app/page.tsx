import { ArrowRight, Code, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Firebase",
  "Genkit AI",
  "UI/UX Design",
];

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-12 px-4 py-12 text-center lg:py-16">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <div className="absolute -top-20 -z-10 blur-3xl">
          <div className="h-48 w-48 rounded-full bg-primary/20 lg:h-64 lg:w-64"></div>
        </div>
        
        <Image
          src="https://placehold.co/128x128.png"
          alt="Phạm Văn Huy"
          width={128}
          height={128}
          className="mb-6 h-32 w-32 rounded-full border-4 border-background object-cover shadow-lg"
          data-ai-hint="man avatar"
        />

        <h1 className="font-headline scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Xin chào, tôi là Phạm Văn Huy
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Tôi là một nhà phát triển web đam mê xây dựng các ứng dụng đẹp, hiệu quả và thân thiện với người dùng. Chào mừng bạn đến với không gian cá nhân của tôi, nơi tôi chia sẻ các dự án và kiến thức của mình.
        </p>
         <p className="mt-2 text-sm text-muted-foreground/80">
          Ngày sinh: 25/07/2011
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/portfolio">
              <Code className="mr-2" /> Xem các dự án của tôi
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">
              <Mail className="mr-2" /> Liên hệ với tôi
            </Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold">Kỹ năng của tôi</h2>
          <p className="text-muted-foreground">Các công nghệ và công cụ tôi làm việc cùng.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-4 py-2 text-base">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
