"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const quotes = [
  {
    quote: "Cách tốt nhất để dự đoán tương lai là phát minh ra nó.",
    author: "Alan Kay",
  },
  {
    quote: "Cuộc sống là 10% những gì xảy ra với bạn và 90% cách bạn phản ứng với nó.",
    author: "Charles R. Swindoll",
  },
  {
    quote: "Mã nguồn giống như sự hài hước. Khi bạn phải giải thích nó, nó đã dở rồi.",
    author: "Cory House",
  },
  {
    quote: "Cách duy nhất để làm nên việc lớn là yêu những gì bạn làm.",
    author: "Steve Jobs",
  },
  {
    quote: "Sự đơn giản là linh hồn của hiệu quả.",
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
          &quot;{quote.quote}&quot;
          <footer className="mt-2 block text-right text-sm font-medium not-italic text-primary">
            — {quote.author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
}
