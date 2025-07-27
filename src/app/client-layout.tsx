
"use client"

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import AuthDependentUI from "./auth-dependent-ui";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <SidebarProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AuthDependentUI>
              {children}
            </AuthDependentUI>
          </motion.div>
        </AnimatePresence>
      </SidebarProvider>
    </ThemeProvider>
  )
}
