

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
  LogOut,
  Mail,
  Newspaper,
  Rss,
  Wrench,
  Palette,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Confetti } from "@/components/confetti";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import AuthDependentUI from "./auth-dependent-ui";


export const metadata: Metadata = {
  title: "All-in-One Personal Hub",
  description:
    "Một trung tâm cá nhân với portfolio, blog, và nhiều công cụ khác.",
};

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
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
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
          <AuthProvider>
            <SidebarProvider>
              <AuthDependentUI>
                 {children}
              </AuthDependentUI>
            </SidebarProvider>
          </AuthProvider>
          <Toaster />
          <Confetti />
        </ThemeProvider>
      </body>
    </html>
  );
}
