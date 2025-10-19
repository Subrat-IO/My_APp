import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import chatRoutes from "./routes/chat.js";
import OpenAI from "openai";

const app = express();
const PORT = 9090;

if (!process.env.MONGO_URI || !process.env.OPENROUTER_API_KEY) {
  console.error("❌ Missing environment variables in .env file");
  process.exit(1);
}

app.use(express.json());
app.use(cors());

// Main routes
app.use("/api", chatRoutes);

// Simple test route
app.post("/test", async (req, res) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: "Tell me a short joke about computers" }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ response: reply });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error);
    res.status(500).json({ error: error.message });
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected with MongoDB");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
};

startServer();
