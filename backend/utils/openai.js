import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://yoursite.com",
    "X-Title": "My App",
  },
});

export default async function getOpenAiResponse(message) {
  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: message }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error from OpenAI:", error);
    throw error;
  }
}
