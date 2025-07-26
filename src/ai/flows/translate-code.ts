'use server';

/**
 * @fileOverview A Genkit flow for translating code from one language to another.
 *
 * - translateCode - A function that takes a code snippet, source language, and target language,
 *   and returns the translated code.
 * - TranslateCodeInput - The input type for the translateCode function.
 * - TranslateCodeOutput - The return type for the translateCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to be translated.'),
  sourceLanguage: z.string().describe('The source programming language.'),
  targetLanguage: z.string().describe('The target programming language.'),
});
export type TranslateCodeInput = z.infer<typeof TranslateCodeInputSchema>;

const TranslateCodeOutputSchema = z.object({
  translatedCode: z
    .string()
    .describe('The translated version of the code.'),
});
export type TranslateCodeOutput = z.infer<typeof TranslateCodeOutputSchema>;

export async function translateCode(
  input: TranslateCodeInput
): Promise<TranslateCodeOutput> {
  return translateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateCodePrompt',
  input: { schema: TranslateCodeInputSchema },
  output: { schema: TranslateCodeOutputSchema },
  prompt: `Bạn là một lập trình viên chuyên gia và là một chuyên gia về dịch mã. Nhiệm vụ của bạn là dịch đoạn mã được cung cấp từ {{sourceLanguage}} sang {{targetLanguage}}.

Điều quan trọng nhất là phải giữ nguyên toàn bộ logic, chức năng và ý nghĩa của đoạn mã gốc. Đừng thêm các tính năng mới hoặc thay đổi cấu trúc cốt lõi. Chỉ dịch cú pháp và các quy ước một cách chính xác.

Mã nguồn cần dịch:
\`\`\`{{sourceLanguage}}
{{{code}}}
\`\`\`
`,
});

const translateCodeFlow = ai.defineFlow(
  {
    name: 'translateCodeFlow',
    inputSchema: TranslateCodeInputSchema,
    outputSchema: TranslateCodeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
