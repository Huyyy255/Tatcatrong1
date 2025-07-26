import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
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
  Animation,
  AudioLines,
  BotMessageSquare,
  ClipboardCopy,
  Code2,
  CodeXml,
  FileText,
  HelpCircle,
  Home,
  ListTodo,
  LogIn,
  Mail,
  Newspaper,
  Rss,
  Wrench,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Confetti } from "@/components/confetti";


export const metadata: Metadata = {
  title: "Trung tâm cá nhân tất cả trong một",
  description:
    "Một trung tâm cá nhân với portfolio, blog, và nhiều công cụ khác.",
};

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
  { href: "/code-translator", label: "Dịch mã đa năng", icon: Code2 },
  { href: "/animations", label: "Hoạt ảnh", icon: Palette},
  { href: "/faq", label: "Hỏi đáp", icon: HelpCircle },
]

const toolsNav = [
   { href: "/chat", label: "Trợ lý AI", icon: BotMessageSquare },
   { href: "/tools", label: "Công cụ", icon: Wrench },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
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
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={{children: 'Đăng nhập'}}>
                            <Link href="/login">
                                <LogIn />
                                <span>Đăng nhập</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
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
          </SidebarProvider>
          <Toaster />
          <Confetti />
        </ThemeProvider>
      </body>
    </html>
  );
}
