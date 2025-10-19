import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import OpenAI from "openai";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 9090;

if ( !process.env.OPENROUTER_API_KEY) {
  console.error("❌ Missing environment variables in .env file");
  process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.post("/test", async (req, res) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": "https://yoursite.com",
      "X-Title": "My App",
    },
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: "Give a joke about computers" }],
    });

    const reply = completion.choices[0].message.content;
    console.log("AI:", reply);
    res.json({ response: reply });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error);
    res.status(500).json({ error: error.message });
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected with DB");

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect DB:", error);
  }
};

startServer();
