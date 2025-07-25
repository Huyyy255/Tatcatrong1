'use server';

/**
 * @fileOverview A Genkit flow for a simple AI chatbot.
 *
 * - chatWithAi - A function that takes a history of messages and returns an AI response.
 * - ChatWithAiInput - The input type for the chatWithAi function.
 * - ChatWithAiOutput - The return type for the chatWithAi function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Message, Part } from 'genkit/model';

const ChatWithAiInputSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.array(z.object({ text: z.string() })),
      })
    )
    .describe('The history of the conversation.'),
});

export type ChatWithAiInput = z.infer<typeof ChatWithAiInputSchema>;

const ChatWithAiOutputSchema = z.object({
  response: z.string().describe('The AI model\'s response.'),
});

export type ChatWithAiOutput = z.infer<typeof ChatWithAiOutputSchema>;

export async function chatWithAi(
  input: ChatWithAiInput
): Promise<ChatWithAiOutput> {
  const { history } = input;

  const { text } = await ai.generate({
    prompt:
      'Bạn là một trợ lý AI hữu ích. Hãy trả lời câu hỏi của người dùng một cách ngắn gọn và hữu ích.',
    history: history as {
      role: 'user' | 'model';
      content: Part[];
    }[],
  });

  return {
    response: text,
  };
}
