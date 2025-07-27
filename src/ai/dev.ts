import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-trending-topics.ts';
import '@/ai/flows/summarize-note.ts';
import '@/ai/flows/generate-image.ts';
import '@/ai/flows/chat-with-ai.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/fix-and-explain-code.ts';
import '@/ai/flows/translate-code.ts';
import '@/ai/flows/compare-code.ts';
import '@/ai/flows/generate-video.ts';
