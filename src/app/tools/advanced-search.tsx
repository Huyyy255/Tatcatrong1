"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { advancedSearchFlow } from '@/ai/flows/advanced-search';
import { runFlow } from '@genkit-ai/flow/client';
import { RocketIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LoadingOverlay } from '@/components/ui/loading-overlay';

export function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setResult('');
    try {
      const response = await runFlow(advancedSearchFlow, { query });
      setResult(response);
    } catch (error) {
      console.error('Error during advanced search:', error);
      setResult('An error occurred while fetching the search results.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <RocketIcon className="mr-2" />
          Advanced Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Enter a topic to research..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            Search
          </Button>
        </div>
        {isLoading && <LoadingOverlay />}
        {result && (
          <div className="prose prose-sm max-w-full">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
