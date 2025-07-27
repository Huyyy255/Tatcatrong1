'use server';

/**
 * @fileOverview A Genkit flow for a simple AI chatbot.
 *
 * - chatWithAi - A function that takes a history of messages and returns an AI response.
 * - ChatWithAiInput - The input type for the chatWithAi function.
 * - ChatWithAiOutput - The return type for the chatWithAi function.
 */

import { ai } from '@/ai/genkit';
import { Part } from 'genkit/model';

export type ChatWithAiInput = {
  history: {
    role: 'user' | 'model';
    content: { text: string }[];
  }[];
};

export type ChatWithAiOutput = {
  response: string;
};

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
