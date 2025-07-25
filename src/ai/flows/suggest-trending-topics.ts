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
  pastArticles: z.array(z.string()).describe('Một mảng các bài viết blog trước đây của người dùng.'),
});
export type SuggestTrendingTopicsInput = z.infer<typeof SuggestTrendingTopicsInputSchema>;

const SuggestTrendingTopicsOutputSchema = z.object({
  suggestedTopics: z.array(z.string()).describe('Một mảng các chủ đề blog thịnh hành được đề xuất.'),
});
export type SuggestTrendingTopicsOutput = z.infer<typeof SuggestTrendingTopicsOutputSchema>;

export async function suggestTrendingTopics(input: SuggestTrendingTopicsInput): Promise<SuggestTrendingTopicsOutput> {
  return suggestTrendingTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTrendingTopicsPrompt',
  input: {schema: SuggestTrendingTopicsInputSchema},
  output: {schema: SuggestTrendingTopicsOutputSchema},
  prompt: `Bạn là một chuyên gia đề xuất chủ đề blog. Dựa trên danh sách các bài viết blog trước đây, hãy đề xuất các chủ đề thịnh hành mà người dùng có thể viết tiếp theo. Trả về một danh sách các chủ đề thịnh hành.

Các bài viết trước đây:
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
