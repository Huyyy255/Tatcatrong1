'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing a note.
 * It uses a generative AI model to create a concise summary of the given text.
 *
 * - summarizeNote - A function that takes a note's content and returns a summary.
 * - SummarizeNoteInput - The input type for the summarizeNote function.
 * - SummarizeNoteOutput - The return type for the summarizeNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNoteInputSchema = z.object({
  noteContent: z.string().describe('Nội dung của ghi chú cần tóm tắt.'),
});
export type SummarizeNoteInput = z.infer<typeof SummarizeNoteInputSchema>;

const SummarizeNoteOutputSchema = z.object({
  summary: z.string().describe('Nội dung tóm tắt của ghi chú.'),
});
export type SummarizeNoteOutput = z.infer<typeof SummarizeNoteOutputSchema>;

export async function summarizeNote(input: SummarizeNoteInput): Promise<SummarizeNoteOutput> {
  return summarizeNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNotePrompt',
  input: {schema: SummarizeNoteInputSchema},
  output: {schema: SummarizeNoteOutputSchema},
  prompt: `Bạn là một trợ lý AI có khả năng tóm tắt văn bản một cách xuất sắc. Hãy tóm tắt nội dung ghi chú sau đây một cách ngắn gọn, súc tích và dễ hiểu.

Nội dung ghi chú:
{{{noteContent}}}
`,
});

const summarizeNoteFlow = ai.defineFlow(
  {
    name: 'summarizeNoteFlow',
    inputSchema: SummarizeNoteInputSchema,
    outputSchema: SummarizeNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
