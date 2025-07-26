
"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const colors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-yellow-400",
  "bg-green-400",
  "bg-teal-400",
];

const animationDurations = [
  "animate-[move_10s_ease-in-out_infinite]",
  "animate-[move_12s_ease-in-out_infinite_2s]",
  "animate-[move_15s_ease-in-out_infinite_4s]",
  "animate-[move_13s_ease-in-out_infinite_1s]",
  "animate-[move_11s_ease-in-out_infinite_3s]",
  "animate-[move_14s_ease-in-out_infinite_5s]",
  "animate-[move_16s_ease-in-out_infinite_6s]",
];

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="relative h-full w-full">
        {colors.map((color, index) => (
          <div
            key={index}
            className={cn(
              "absolute h-96 w-96 rounded-full opacity-50 blur-3xl",
              color,
              animationDurations[index % animationDurations.length],
              resolvedTheme === "light" ? "mix-blend-multiply" : "mix-blend-lighten"
            )}
            style={{
                // Random initial positions
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes move {
          0% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(${Math.random() * 40 - 20}vw, ${Math.random() * 40 - 20}vh) scale(${0.8 + Math.random() * 0.4});
          }
          50% {
            transform: translate(${Math.random() * 40 - 20}vw, ${Math.random() * 40 - 20}vh) scale(${1 + Math.random() * 0.2});
          }
          75% {
            transform: translate(${Math.random() * 40 - 20}vw, ${Math.random() * 40 - 20}vh) scale(${0.8 + Math.random() * 0.4});
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
