import express from "express";
import Thread from "../models/thread.js";
import getOpenAiResponse from "../utils/openai.js";

const router = express.Router();

// POST /api/chat
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields: threadId or message" });
  }

  try {
    // Find existing thread
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      // Create new thread if it doesn't exist
      thread = new Thread({
        threadId,
        title: message.slice(0, 50), // first 50 chars as title
        messages: [{ role: "user", content: message }],
      });
    } else {
      // Add user message to existing thread
      thread.messages.push({ role: "user", content: message });
    }

    // Get AI response
    const assistantReply = await getOpenAiResponse(message);

    // Add AI message
    thread.messages.push({ role: "assistant", content: assistantReply });

    // Update timestamp
    thread.updatedAt = new Date();

    // Save to MongoDB
    await thread.save();

    res.json({ reply: assistantReply });
  } catch (error) {
    console.error("❌ Error in /chat route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });

    res.json(threads);





  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch threads" });
  }
})


router.get("thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json("thread Not found");

    }
    res.json(thread.messages);


  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "failed to fetch thread" });
  }
})


router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "thread cannot be deleted" });
    }

    res.status(200).json({ message: "thread deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});


export default router;
