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
          Full-Stack Developer & Tech Enthusiast
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
          Welcome to my digital space! I build modern web applications and love
          to explore new technologies. Here you can find my projects, read my
          thoughts on tech, and use some cool tools I've built.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/portfolio">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">Read My Blog</Link>
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
                  <CardTitle className="font-headline">My Projects</CardTitle>
                  <CardDescription>
                    Explore the things I've built.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                From personal experiments to client work, my portfolio
                showcases a range of projects demonstrating my skills in modern
                web development.
              </p>
              <Button asChild variant="link" className="mt-2 px-0">
                <Link href="/portfolio">
                  See Portfolio <ArrowRight className="ml-2 h-4 w-4" />
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
                    Blog & Articles
                  </CardTitle>
                  <CardDescription>
                    My thoughts on tech and development.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                I write about topics like Next.js, Firebase, GenAI, and
                productivity. Follow along for tutorials, insights, and my
                personal development journey.
              </p>
              <Button asChild variant="link" className="mt-2 px-0">
                <Link href="/blog">
                  Visit Blog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
