import express from "express";
import Thread from "../models/thread.js";
import getOpenAiResponse from "../utils/openai.js";

const router = express.Router();

// ---------------- POST /api/chat ----------------
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields: threadId or message" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      // Thread doesn't exist, create new with title = first message
      thread = new Thread({
        threadId,
        title: message.slice(0, 50),
        messages: [{ role: "user", content: message }],
      });
    } else {
      // If thread exists and has no title, set title to first message
      if (!thread.title) {
        thread.title = message.slice(0, 50);
      }
      thread.messages.push({ role: "user", content: message });
    }

    // Get AI response
    const assistantReply = await getOpenAiResponse(message);
    thread.messages.push({ role: "assistant", content: assistantReply });

    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply: assistantReply });
  } catch (error) {
    console.error("❌ Error in /chat route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- GET /api/thread ----------------
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.error("❌ Error fetching threads:", error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// ---------------- POST /api/thread ----------------
router.post("/thread", async (req, res) => {
  try {
    const newThread = new Thread({
      threadId: `thread-${Date.now()}`,
      title: "", // empty initially, will be updated with first message
      messages: [],
    });

    await newThread.save();
    res.status(201).json(newThread);
  } catch (error) {
    console.error("❌ Error creating new thread:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- GET /api/thread/:threadId ----------------
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (error) {
    console.error("❌ Error fetching thread:", error);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

// ---------------- DELETE /api/thread/:threadId ----------------
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread cannot be deleted" });
    }

    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting thread:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
