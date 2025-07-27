
import { getJson } from 'serpapi';
import { geminiPro } from '../ai/genkit';
import { generate } from '@genkit-ai/ai';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
}

export const searchGoogle = async (query: string): Promise<string> => {
  const params = {
    q: query,
    api_key: process.env.SERPAPI_API_KEY || "YOUR_SERPAPI_API_KEY",
  };

  try {
    const response = await getJson("google", params);
    const organicResults = response.organic_results as SearchResult[];
    return JSON.stringify(organicResults.slice(0, 10)); // Return top 10 results
  } catch (error) {
    console.error('Error during Google search:', error);
    return JSON.stringify([]);
  }
};

export const extractRelevantContent = async (
  searchResults: string,
  query: string
): Promise<string> => {
  const llmResponse = await generate({
    prompt: `Based on the following search results, please provide a comprehensive summary of the topic: "${query}". Search results: ${searchResults}`,
    model: geminiPro,
    config: {
      maxOutputTokens: 1024,
      temperature: 0.3,
    },
  });

  return llmResponse.text();
};
