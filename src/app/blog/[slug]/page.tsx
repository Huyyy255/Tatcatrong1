import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { allPosts } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center text-muted-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại blog
            </Link>
        </Button>
      </div>
      <h1 className="font-headline mb-4 text-center text-4xl font-bold">
        {post.title}
      </h1>
      <div className="mb-8 flex flex-col items-center justify-center text-sm text-muted-foreground">
        <span>
          Đăng bởi {post.author} vào {post.date}
        </span>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          data-ai-hint={post.aiHint}
        />
      </div>

      <div className="prose prose-lg mx-auto max-w-none dark:prose-invert">
        <p>{post.content}</p>
      </div>
    </article>
  );
}
