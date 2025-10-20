import { createContext } from "react";

// Create a context with default values (optional)
export const MyContext = createContext({
  prompt: "",
  setPrompt: () => {},
  reply: null,
  setReply: () => {},
});
