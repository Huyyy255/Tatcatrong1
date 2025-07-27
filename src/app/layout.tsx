
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Confetti } from "@/components/confetti";
import ClientLayout from "./client-layout";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "All-in-One Personal Hub | Trang chủ",
    template: "%s | All-in-One Personal Hub",
  },
  description: "Một trung tâm cá nhân để giới thiệu dự án, viết blog, và sử dụng các công cụ AI mạnh mẽ. Khám phá các công cụ quản lý công việc, ghi chú, và sáng tạo nội dung độc đáo.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Firebase", "Genkit", "AI", "Portfolio", "Blog"],
  authors: [{ name: "Your Name", url: "https://your-website.com" }],
  creator: "Your Name",
  openGraph: {
    title: "All-in-One Personal Hub | Trang chủ",
    description: "Khám phá một không gian cá nhân đa năng được xây dựng với các công nghệ web mới nhất và AI.",
    url: "https://your-website.com",
    siteName: "All-in-One Personal Hub",
    images: [
      {
        url: "https://placehold.co/1200x630.png",
        width: 1200,
        height: 630,
        alt: "All-in-One Personal Hub",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All-in-One Personal Hub | Trang chủ",
    description: "Khám phá một không gian cá nhân đa năng được xây dựng với các công nghệ web mới nhất và AI.",
    images: ["https://placehold.co/1200x630.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
        <Confetti />
      </body>
    </html>
  );
}
