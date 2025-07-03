"use server";
/**
 * @fileOverview A chatbot flow using OpenRouter.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatMessage - The type for a single chat message.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import OpenAI from "openai";
import Together from "together-ai";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};
export type ChatInput = { messages: ChatMessage[] };
export type ChatOutput = { message: string };

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://yourdomain.com",
    "X-Title": "Amirul Portfolio",
  },
});

const together = process.env.TOGETHER_API_KEY
  ? new Together({ apiKey: process.env.TOGETHER_API_KEY })
  : null;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const systemPrompt: ChatMessage = {
    role: "system",
    content:
      "You are a helpful portfolio assistant named Amirul Maulana. You are assisting users on the portfolio of a developer and designer named Amirul Maulana. Be friendly, professional, and answer questions about Amirul Maulana's projects, skills, and experience based on the context of the website. Keep your answers concise.",
  };
  try {
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [systemPrompt, ...input.messages],
    });
    const message =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";
    return { message };
  } catch (err: any) {
    // Fallback to Together AI if available
    if (together) {
      const completion = await together.chat.completions.create({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        messages: [systemPrompt, ...input.messages],
      });
      const message =
        completion.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";
      return { message };
    } else {
      throw new Error(
        "OpenRouter failed and Together AI fallback not available."
      );
    }
  }
}
