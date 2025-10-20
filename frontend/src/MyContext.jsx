import { createContext, useState } from 'react';

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [threads, setThreads] = useState([]);          // all chat threads
  const [currThreadId, setCurrThreadId] = useState(null); // current selected thread ID
  const [messages, setMessages] = useState([]);        // messages for current thread
  const [prompt, setPrompt] = useState('');            // input box value

  return (
    <MyContext.Provider value={{
      threads,
      setThreads,
      currThreadId,
      setCurrThreadId,
      messages,
      setMessages,
      prompt,
      setPrompt
    }}>
      {children}
    </MyContext.Provider>
  );
}
