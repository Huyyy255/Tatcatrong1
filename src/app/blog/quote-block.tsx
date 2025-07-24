"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const quotes = [
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    quote: "Life is 10% what happens to you and 90% how you react to it.",
    author: "Charles R. Swindoll",
  },
  {
    quote: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
];

export default function QuoteBlock() {
  const [quote, setQuote] = useState({ quote: "", author: "" });

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  if (!quote.quote) return null;

  return (
    <Card className="my-12 border-l-4 border-primary bg-primary/5">
      <CardContent className="p-6">
        <blockquote className="italic text-foreground">
          "{quote.quote}"
          <footer className="mt-2 block text-right text-sm font-medium not-italic text-primary">
            — {quote.author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
}
