import OpenAI from "openai";
import "dotenv/config";

const getOpenAiResponse = async (message) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": "https://yoursite.com", // your real site
      "X-Title": "My App",
    },
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-5-chat",
      messages: [{ role: "user", content: message }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    // rethrow the error so the route can catch it
    throw new Error(error.message);
  }
};

export default getOpenAiResponse;
