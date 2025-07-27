'use server';
/**
 * @fileOverview A Genkit flow for generating videos from a text prompt using Veo.
 *
 * - generateVideo - A function that takes a text prompt and returns a video data URI.
 * - GenerateVideoInput - The input type for the generateVideo function.
 * - GenerateVideoOutput - The return type for the generateVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MediaPart } from 'genkit/model';
import { Readable } from 'stream';

const GenerateVideoInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate a video from.'),
});
export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "The generated video as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:video/mp4;base64,<encoded_data>'."
    ),
});
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

export async function generateVideo(
  input: GenerateVideoInput
): Promise<GenerateVideoOutput> {
  return generateVideoFlow(input);
}

// Helper to download video from URL and convert to base64 data URI
async function downloadVideoAsDataUri(video: MediaPart): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }
    const fetch = (await import('node-fetch')).default;
    // The video URL from Veo needs the API key to be accessible
    const videoUrl = `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(videoUrl);

    if (!response.ok || !response.body) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const videoBuffer = await response.buffer();
    const base64 = videoBuffer.toString('base64');
    return `data:video/mp4;base64,${base64}`;
}


const generateVideoFlow = ai.defineFlow(
  {
    name: 'generateVideoFlow',
    inputSchema: GenerateVideoInputSchema,
    outputSchema: GenerateVideoOutputSchema,
  },
  async ({ prompt }) => {
    let { operation } = await ai.generate({
        model: 'googleai/veo-2.0-generate-001',
        prompt: prompt,
        config: {
            durationSeconds: 5,
            aspectRatio: '16:9',
        },
    });

    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

    // Poll the operation until it's done
    while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error(`Failed to generate video: ${operation.error.message}`);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media && p.media.contentType === 'video/mp4');
    if (!videoPart) {
        throw new Error('Failed to find the generated video in the operation result');
    }

    const videoDataUri = await downloadVideoAsDataUri(videoPart);

    return {
      videoDataUri: videoDataUri,
    };
  }
);
