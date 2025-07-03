"use server";
/**
 * @fileOverview A project description summarization AI agent.
 *
 * - summarizeProjectDescription - A function that summarizes a project description.
 * - SummarizeProjectDescriptionInput - The input type for the summarizeProjectDescription function.
 * - SummarizeProjectDescriptionOutput - The return type for the summarizeProjectDescription function.
 */

import Together from "together-ai";

export type SummarizeProjectDescriptionInput = { projectDescription: string };
export type SummarizeProjectDescriptionOutput = { summary: string };

export async function summarizeProjectDescription(
  input: SummarizeProjectDescriptionInput
): Promise<SummarizeProjectDescriptionOutput> {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
  if (!OPENROUTER_API_KEY)
    throw new Error("OPENROUTER_API_KEY is not set in .env file");

  const systemPrompt = {
    role: "system",
    content:
      "You are an AI expert at creating concise summaries. Summarize project descriptions in a single, clear sentence.",
  };
  const userPrompt = {
    role: "user",
    content: `Summarize the following project description in a single sentence:\n\n${input.projectDescription}`,
  };

  // Try OpenRouter first
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourdomain.com",
          "X-Title": "Amirul Portfolio",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct:free",
          messages: [systemPrompt, userPrompt],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("OpenRouter response:", JSON.stringify(data, null, 2));
      let summary = "No summary generated.";
      if (Array.isArray(data.choices) && data.choices[0]?.message?.content) {
        summary = data.choices[0].message.content;
      } else if (data.error?.message) {
        summary = `Error: ${data.error.message}`;
      } else {
        console.error("Unexpected OpenRouter response:", data);
      }
      return { summary };
    } else {
      const error = await response.text();
      if (error.includes("Rate limit exceeded")) {
        // fallback to Together SDK
        if (!TOGETHER_API_KEY)
          throw new Error("TOGETHER_API_KEY is not set in .env file");
        const together = new Together({ apiKey: TOGETHER_API_KEY });
        const response = await together.chat.completions.create({
          messages: [systemPrompt, userPrompt],
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        });
        const summary =
          response.choices[0]?.message?.content || "No summary generated.";
        return { summary };
      } else {
        throw new Error(`Failed to get response from OpenRouter: ${error}`);
      }
    }
  } catch (err) {
    // fallback to Together SDK on any error
    if (!TOGETHER_API_KEY)
      throw new Error("TOGETHER_API_KEY is not set in .env file");
    const together = new Together({ apiKey: TOGETHER_API_KEY });
    const response = await together.chat.completions.create({
      messages: [systemPrompt, userPrompt],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    });
    const summary =
      response.choices[0]?.message?.content || "No summary generated.";
    return { summary };
  }
}
