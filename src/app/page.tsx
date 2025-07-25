import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Briefcase, Mic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="text-center">
        <Image
          src="https://placehold.co/150x150.png"
          alt="Your Name"
          width={150}
          height={150}
          data-ai-hint="profile picture"
          className="mx-auto mb-6 rounded-full shadow-lg"
        />
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          John Doe
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Lập Trình Viên Full-Stack & Người Đam Mê Công Nghệ
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
          Chào mừng đến với không gian số của tôi! Tôi xây dựng các ứng dụng web hiện đại và yêu
          thích khám phá các công nghệ mới. Tại đây bạn có thể tìm thấy các dự án của tôi, đọc suy
          nghĩ của tôi về công nghệ, và sử dụng một số công cụ thú vị mà tôi đã xây dựng.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/portfolio">
              Xem Dự Án Của Tôi <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">Đọc Blog Của Tôi</Link>
          </Button>
        </div>
      </section>

      <section className="mt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline">Dự Án Của Tôi</CardTitle>
                  <CardDescription>
                    Khám phá những thứ tôi đã xây dựng.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Từ các thử nghiệm cá nhân đến công việc cho khách hàng, portfolio của tôi
                trưng bày một loạt các dự án thể hiện kỹ năng của tôi trong phát triển
                web hiện đại.
              </p>
              <Button asChild variant="link" className="mt-2 px-0">
                <Link href="/portfolio">
                  Xem Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline">
                    Blog & Bài Viết
                  </CardTitle>
                  <CardDescription>
                    Suy nghĩ của tôi về công nghệ và phát triển.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Tôi viết về các chủ đề như Next.js, Firebase, GenAI, và
                năng suất. Theo dõi để xem các bài hướng dẫn, thông tin chi tiết, và
                hành trình phát triển cá nhân của tôi.
              </p>
              <Button asChild variant="link" className="mt-2 px-0">
                <Link href="/blog">
                  Ghé Thăm Blog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
