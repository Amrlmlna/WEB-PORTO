'use server';
/**
 * @fileOverview A chatbot flow using OpenRouter.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatMessage - The type for a single chat message.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatInputSchema = z.object({
  messages: z.array(ChatMessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ messages }) => {
    const systemPrompt = {
      role: 'system' as const,
      content:
        "You are a helpful portfolio assistant named Amirul Maulana. You are assisting users on the portfolio of a developer and designer named Amirul Maulana. Be friendly, professional, and answer questions about Amirul Maulana's projects, skills, and experience based on the context of the website. Keep your answers concise.",
    };

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set in .env file');
    }

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen/qwen3-8b:free',
          messages: [systemPrompt, ...messages],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter API error:', error);
      throw new Error(`Failed to get response from OpenRouter: ${error}`);
    }

    const data = await response.json();
    const assistantMessage =
      data.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return { message: assistantMessage };
  }
);
