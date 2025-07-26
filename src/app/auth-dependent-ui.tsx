
"use client";

import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  BotMessageSquare,
  ClipboardCopy,
  Code2,
  CodeXml,
  FileText,
  HelpCircle,
  Home,
  ListTodo,
  LogIn,
  LogOut,
  Mail,
  Newspaper,
  Rss,
  Palette,
  Star,
  User,
  Sparkles,
  Sun,
  Laugh,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const mainNav = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/portfolio", label: "Dự án", icon: CodeXml },
  { href: "/blog", label: "Bài viết", icon: Newspaper },
  { href: "/contact", label: "Liên hệ", icon: Mail },
];

const utilitiesNav = [
  { href: "/tasks",label: "Công việc", icon: ListTodo },
  { href: "/notes", label: "Ghi chú", icon: FileText },
  { href: "/snippets", label: "Snippets", icon: ClipboardCopy },
  { href: "/favorites", label: "Yêu thích", icon: Star },
  { href: "/faq", label: "Hỏi đáp", icon: HelpCircle },
]

const toolsNav = [
   { href: "/chat", label: "Trợ lý AI", icon: BotMessageSquare },
   { href: "/tools", label: "Công cụ", icon: Sparkles },
   { href: "/code-translator", label: "Dịch mã đa năng", icon: Code2 },
]

const lifestyleNav = [
    { href: "/animations", label: "Hoạt ảnh", icon: Palette},
    { href: "/memes", label: "Tạo ảnh & Meme", icon: Laugh },
]

export default function AuthDependentUI({ children }: { children: React.ReactNode }) {
    const { user, signOut } = useAuth();

    return (
        <>
        <Sidebar>
            <SidebarHeader>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                    <Rss className="h-6 w-6 text-primary" />
                </Link>
                </Button>
                <span className="font-headline font-bold">
                Trung tâm cá nhân
                </span>
            </div>
            </SidebarHeader>
            <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Cá nhân</SidebarGroupLabel>
                <SidebarMenu>
                    {mainNav.map((link) => (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton asChild tooltip={{ children: link.label }}>
                        <Link href={link.href}>
                            <link.icon />
                            <span>{link.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Tiện ích</SidebarGroupLabel>
                <SidebarMenu>
                    {utilitiesNav.map((link) => (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton asChild tooltip={{ children: link.label }}>
                        <Link href={link.href}>
                            <link.icon />
                            <span>{link.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Công cụ AI</SidebarGroupLabel>
                <SidebarMenu>
                    {toolsNav.map((link) => (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton asChild tooltip={{ children: link.label }}>
                        <Link href={link.href}>
                            <link.icon />
                            <span>{link.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Đời sống</SidebarGroupLabel>
                <SidebarMenu>
                    {lifestyleNav.map((link) => (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton asChild tooltip={{ children: link.label }}>
                        <Link href={link.href}>
                            <link.icon />
                            <span>{link.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
            <SidebarMenu>
                {user ? (
                    <SidebarMenuItem>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton asChild={false} className="w-full justify-start">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="truncate">{user.email}</span>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                                <DropdownMenuItem onClick={signOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ) : (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={{children: 'Đăng nhập'}}>
                            <Link href="/login">
                                <LogIn />
                                <span>Đăng nhập</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
            </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-16 items-center justify-between border-b px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
            </header>
            <main>{children}</main>
        </SidebarInset>
        </>
    )
}
