

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarProvider
} from "@/components/ui/sidebar";
import { Confetti } from "@/components/confetti";
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
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
              <AuthDependentUI>
                 {children}
              </AuthDependentUI>
            </SidebarProvider>
          <Toaster />
          <Confetti />
        </ThemeProvider>
      </body>
    </html>
  );
}
