"use client";

import { useState } from "react";
import {
  suggestTrendingTopics,
  SuggestTrendingTopicsOutput,
} from "@/ai/flows/suggest-trending-topics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// A mock list of past articles to feed to the AI
const pastArticles = [
  "Mastering Next.js 14: A Deep Dive into the App Router",
  "Firebase for Beginners: Auth, Firestore, and Storage",
  "The Art of Tailwind CSS: Tips and Tricks",
];

export default function TrendingTopics() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] =
    useState<SuggestTrendingTopicsOutput | null>(null);
  const { toast } = useToast();

  const handleSuggestTopics = async () => {
    setLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestTrendingTopics({ pastArticles });
      setSuggestions(result);
    } catch (error) {
      console.error("Failed to suggest topics:", error);
      toast({
        title: "Error",
        description: "Could not fetch topic suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Get AI-powered blog topic suggestions based on your past articles.
      </p>
      <div className="flex items-center gap-4">
        <Button onClick={handleSuggestTopics} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Suggest Topics
            </>
          )}
        </Button>
      </div>

      {suggestions && suggestions.suggestedTopics.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 font-semibold">Here are some ideas:</h3>
          <Card>
            <CardContent className="p-4">
              <ul className="list-inside list-disc space-y-2">
                {suggestions.suggestedTopics.map((topic, index) => (
                  <li key={index} className="text-foreground/80">
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
