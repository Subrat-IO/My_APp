import { createContext } from "react";

export const MyContext = createContext({
  prompt: "",
  setPrompt: () => {},
  reply: null,
  setReply: () => {},
  messages: [],
  setMessages: () => {},
  threads: [],
  setThreads: () => {},
  currThreadId: null,
  setCurrThreadId: () => {},
});
