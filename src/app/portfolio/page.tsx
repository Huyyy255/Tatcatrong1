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
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce site with product management, shopping cart, and Stripe integration.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "Firebase", "Stripe", "Tailwind CSS"],
    github: "#",
    live: "#",
    aiHint: "online store",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task manager with real-time updates, boards, and user authentication.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "Firestore", "Auth", "Framer Motion"],
    github: "#",
    live: "#",
    aiHint: "kanban board",
  },
  {
    title: "AI Content Generator",
    description:
      "A SaaS application that uses generative AI to create marketing copy and blog posts.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "GenAI", "Vercel"],
    github: "#",
    live: "#",
    aiHint: "robot writing",
  },
  {
    title: "Personal Portfolio v1",
    description:
      "My previous portfolio website, built with simple HTML, CSS, and JavaScript.",
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
          My Portfolio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A selection of projects I've worked on.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl"
          >
            <CardHeader className="p-0">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="h-auto w-full object-cover"
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
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
