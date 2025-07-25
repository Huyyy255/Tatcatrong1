"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteBlock from "./quote-block";
import { allPosts, allTags } from "@/lib/posts";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Blog của tôi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Những hiểu biết, hướng dẫn và câu chuyện về công nghệ và phát triển.
        </p>
      </div>

      <QuoteBlock />

      <div className="my-8 flex flex-col items-center gap-4 md:flex-row">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
          >
            Tất cả
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card
            key={post.slug}
            className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="aspect-video h-auto w-full object-cover"
                  data-ai-hint={post.aiHint}
                />
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <div className="mb-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="font-headline mb-2 text-lg leading-snug">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
            </Link>
            <CardFooter className="flex items-center justify-between p-6 pt-0 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center text-primary hover:underline"
              >
                Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <div className="col-span-full py-16 text-center">
          <p className="text-muted-foreground">
            Không tìm thấy bài viết nào. Hãy thử tìm kiếm hoặc bộ lọc khác.
          </p>
        </div>
      )}
    </div>
  );
}
