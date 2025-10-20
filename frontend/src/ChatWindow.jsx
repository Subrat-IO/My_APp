import './ChatWindow.css';
import Chat from "./Chat.jsx";
import { MyContext } from './MyContext.jsx';
import { useContext } from 'react';

export default function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId } = useContext(MyContext);

  const getReply = async () => {
    if (!prompt.trim()) return; // prevent empty messages

    try {
      const response = await fetch("http://localhost:9090/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ✅ body must be a JSON string
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server reply:", data);

      // ✅ Assuming server returns { reply: "..." }
      setReply(data.reply || "No reply received");
      setPrompt(""); // clear input after sending
    } catch (error) {
      console.error("Error fetching reply:", error);
      setReply("Error getting reply. Please try again.");
    }
  };

  return (
    <div className="WindowText">
      {/* Navbar */}
      <div className="navbar">
        <span className="title">
          Sigma GPT <i className='bx bxs-chevron-down DownArrow'></i>
        </span>
        <div className="userIconDiv">
          <i className='bx bxs-user'></i>
        </div>
      </div>

      {/* Chat Area */}
      <div className="Chat">
        <Chat reply={reply} /> {/* ✅ Pass reply down if needed */}
      </div>

      {/* Input Box */}
      <div className="ChatInputContainer">
        <div className="ChatInput">
          <input
            type="text"
            className="chatBox"
            placeholder="Send a message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()} // Press Enter to send
          />
          <button className="sendBtn" onClick={getReply}>
            <i className='bx bxs-send'></i>
          </button>
        </div>
        <p className="infotext">This information can be inaccurate.</p>
      </div>
    </div>
  );
}
