
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CodeXml,
  Home,
  Newspaper,
  Rss,
  Wrench,
  HelpCircle,
  ListTodo,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/portfolio", label: "Dự án", icon: CodeXml },
  { href: "/blog", label: "Bài viết", icon: Newspaper },
  { href: "/tasks", label: "Công việc", icon: ListTodo },
  { href: "/notes", label: "Ghi chú", icon: FileText },
  { href: "/faq", label: "Hỏi đáp", icon: HelpCircle },
  { href: "/tools", label: "Công cụ", icon: Wrench },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Rss className="h-6 w-6 text-primary" />
          <span className="hidden font-headline font-bold sm:inline-block">
            Trung tâm cá nhân
          </span>
        </Link>
        <nav className="flex flex-grow items-center space-x-1 sm:space-x-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground",
                "hover:text-primary"
              )}
            >
              <Link href={link.href}>
                <link.icon className="h-5 w-5 md:hidden" />
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
