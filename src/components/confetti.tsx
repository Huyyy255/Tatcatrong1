"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Confetti() {
  const { theme } = useTheme();
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    setIsBirthday(theme === "birthday");
  }, [theme]);

  if (!isBirthday) {
    return null;
  }

  const confettiPieces = Array.from({ length: 15 }).map((_, i) => (
    <div
      key={i}
      className="confetti-piece"
      style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}
    />
  ));

  return <div id="confetti">{confettiPieces}</div>;
}
