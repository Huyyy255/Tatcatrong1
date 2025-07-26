'use server';

/**
 * @fileOverview A Genkit flow for comparing two code snippets and explaining the differences.
 *
 * - compareCode - A function that takes two code snippets and returns an explanation of the differences.
 * - CompareCodeInput - The input type for the compareCode function.
 * - CompareCodeOutput - The return type for the compareCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CompareCodeInputSchema = z.object({
  codeA: z.string().describe('The first code snippet (e.g., the original version).'),
  codeB: z.string().describe('The second code snippet (e.g., the modified version).'),
});
export type CompareCodeInput = z.infer<typeof CompareCodeInputSchema>;

const CompareCodeOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A detailed explanation of the differences between the two code snippets, highlighting additions, deletions, and modifications.'
    ),
});
export type CompareCodeOutput = z.infer<typeof CompareCodeOutputSchema>;

export async function compareCode(
  input: CompareCodeInput
): Promise<CompareCodeOutput> {
  return compareCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareCodePrompt',
  input: { schema: CompareCodeInputSchema },
  output: { schema: CompareCodeOutputSchema },
  prompt: `Bạn là một chuyên gia review code. Nhiệm vụ của bạn là so sánh hai đoạn mã sau đây và đưa ra một lời giải thích chi tiết về sự khác biệt.

Hãy tập trung vào việc xác định những thay đổi, bao gồm các dòng đã được thêm vào, xóa đi, hoặc sửa đổi. Giải thích ý nghĩa của những thay đổi đó nếu có thể. Trình bày kết quả một cách rõ ràng và có cấu trúc.

Mã gốc (Phiên bản A):
\`\`\`
{{{codeA}}}
\`\`\`

Mã đã sửa đổi (Phiên bản B):
\`\`\`
{{{codeB}}}
\`\`\`

Hãy phân tích sự khác biệt giữa hai phiên bản trên.
`,
});

const compareCodeFlow = ai.defineFlow(
  {
    name: 'compareCodeFlow',
    inputSchema: CompareCodeInputSchema,
    outputSchema: CompareCodeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
