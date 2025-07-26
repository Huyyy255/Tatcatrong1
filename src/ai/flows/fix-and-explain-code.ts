'use server';

/**
 * @fileOverview A Genkit flow for fixing and explaining code snippets.
 *
 * - fixAndExplainCode - A function that takes a code snippet and returns a fixed version and an explanation.
 * - FixAndExplainCodeInput - The input type for the fixAndExplainCode function.
 * - FixAndExplainCodeOutput - The return type for the fixAndExplainCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FixAndExplainCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to be fixed and explained.'),
});
export type FixAndExplainCodeInput = z.infer<
  typeof FixAndExplainCodeInputSchema
>;

const FixAndExplainCodeOutputSchema = z.object({
  fixedCode: z
    .string()
    .describe(
      'The corrected version of the code. If no errors are found, the original code is returned.'
    ),
  explanation: z
    .string()
    .describe(
      'A detailed explanation of the errors found and the changes made.'
    ),
});
export type FixAndExplainCodeOutput = z.infer<
  typeof FixAndExplainCodeOutputSchema
>;

export async function fixAndExplainCode(
  input: FixAndExplainCodeInput
): Promise<FixAndExplainCodeOutput> {
  return fixAndExplainCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fixAndExplainCodePrompt',
  input: { schema: FixAndExplainCodeInputSchema },
  output: { schema: FixAndExplainCodeOutputSchema },
  prompt: `Bạn là một lập trình viên chuyên nghiệp và là một chuyên gia sửa lỗi. Nhiệm vụ của bạn là phân tích đoạn mã được cung cấp, xác định bất kỳ lỗi cú pháp hoặc lỗi logic nào và cung cấp phiên bản đã sửa. Đồng thời, hãy đưa ra một lời giải thích rõ ràng và ngắn gọn về những lỗi bạn đã tìm thấy và cách bạn đã sửa chúng.

Nếu không tìm thấy lỗi, hãy trả về mã gốc và một lời giải thích cho biết mã có vẻ đúng.

Mã cần phân tích:
\`\`\`
{{{code}}}
\`\`\`
`,
});

const fixAndExplainCodeFlow = ai.defineFlow(
  {
    name: 'fixAndExplainCodeFlow',
    inputSchema: FixAndExplainCodeInputSchema,
    outputSchema: FixAndExplainCodeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
