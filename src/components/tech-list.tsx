
"use client";

import { motion } from "framer-motion";

export default function TechList() {
  const items = [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Firebase",
    "Genkit",
  ];
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15, ease: "easeInOut" }}
          className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
        >
          <span className="font-semibold">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}
