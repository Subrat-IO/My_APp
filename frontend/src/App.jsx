import { useState, useEffect } from 'react';
import './App.css';
import SideBar from './Sidebar';
import ChatWindow from './ChatWindow';
import { MyContext } from './MyContext.jsx';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [currThreadId, setCurrThreadId] = useState(null);

  // Fetch threads from backend on mount
  useEffect(() => {
    fetch("http://localhost:9090/api/thread")
      .then(res => res.json())
      .then(data => {
        setThreads(data);
        if (data.length) {
          setCurrThreadId(data[0].threadId); // select first thread by default
          setMessages(data[0].messages);
        }
      })
      .catch(err => console.error("Error fetching threads:", err));
  }, []);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    messages,
    setMessages,
    threads,
    setThreads,
    currThreadId,
    setCurrThreadId,
  };

  return (
    <MyContext.Provider value={providerValues}>
      <div className="app-container" style={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <ChatWindow />
      </div>
    </MyContext.Provider>
  );
}

export default App;
