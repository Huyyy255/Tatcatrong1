// src/ai/flows/suggest-trending-topics.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting trending blog topics
 * based on a user's past articles. It uses a generative AI model to come up with relevant ideas.
 *
 * - suggestTrendingTopics - A function that suggests trending topics based on past articles.
 * - SuggestTrendingTopicsInput - The input type for the suggestTrendingTopics function.
 * - SuggestTrendingTopicsOutput - The return type for the suggestTrendingTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const SuggestTrendingTopicsInputSchema = z.object({
  pastArticles: z.array(z.string()).describe('An array of the user\'s past blog articles.'),
});
export type SuggestTrendingTopicsInput = z.infer<typeof SuggestTrendingTopicsInputSchema>;

const SuggestTrendingTopicsOutputSchema = z.object({
  suggestedTopics: z.array(z.string()).describe('An array of suggested trending blog topics.'),
});
export type SuggestTrendingTopicsOutput = z.infer<typeof SuggestTrendingTopicsOutputSchema>;

export async function suggestTrendingTopics(input: SuggestTrendingTopicsInput): Promise<SuggestTrendingTopicsOutput> {
  return suggestTrendingTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTrendingTopicsPrompt',
  input: {schema: SuggestTrendingTopicsInputSchema},
  output: {schema: SuggestTrendingTopicsOutputSchema},
  prompt: `You are a blog topic suggestion expert. Given the following list of past blog articles, suggest trending topics that the user could write about next. Return a list of trending topics.

Past Articles:
{{#each pastArticles}}
- {{{this}}}
{{/each}}
`,
});

const suggestTrendingTopicsFlow = ai.defineFlow(
  {
    name: 'suggestTrendingTopicsFlow',
    inputSchema: SuggestTrendingTopicsInputSchema,
    outputSchema: SuggestTrendingTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
