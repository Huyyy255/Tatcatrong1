import { defineFlow } from 'genkit';
import { ai } from '../genkit';
import { z } from 'zod';
import {
  defineTool,
  generate,
} from 'genkit/ai';
import {
  searchGoogle,
  extractRelevantContent,
} from '../../lib/search';
import { string } from 'genkit/zod';

const tavilySearchTool = defineTool(
  {
    name: 'tavilySearch',
    description: 'Searches the web for information on a given query.',
    inputSchema: z.object({
      query: z.string(),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const searchResults = await searchGoogle(input.query);

    // Extract relevant content from search results
    const relevantContent = await extractRelevantContent(
      searchResults,
      input.query
    );

    return relevantContent;
  }
);

export const advancedSearchFlow = defineFlow(
  {
    name: 'advancedSearchFlow',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: string,
  },
  async (input) => {
    const llmResponse = await generate({
      prompt: `You are a world-class researcher. Your task is to provide a comprehensive and insightful summary of the given topic based on the provided context. The summary should be well-structured, easy to understand, and cover the most important aspects of the topic. The topic is: ${input.query}`,
      model: ai,
      tools: [tavilySearchTool],
      config: {
        maxOutputTokens: 2048,
        temperature: 0.5,
      },
    });

    return llmResponse.text();
  }
);
