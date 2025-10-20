import './ChatWindow.css';
import { MyContext } from './MyContext.jsx';
import { useContext, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown'; // <-- added

export default function ChatWindow() {
  const { prompt, setPrompt, messages, setMessages, currThreadId } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: prompt }]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch("https://my-app-grd4.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, threadId: currThreadId }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      // Add assistant message
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error fetching reply:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error getting reply. Please try again." }]);
    } finally {
      setLoading(false);
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
        {messages.length === 0 && (
          <div className="assistantMessage introText">
            <p>Welcome! Select a chat or start a new chat to begin.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="messageWrapper">
            <div className={msg.role === "user" ? "userMessage" : "assistantMessage"}>
              {msg.role === "assistant" ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="messageWrapper">
            <div className="assistantMessage loaderBubble">
              <ScaleLoader color="#10a37f" height={16} />
            </div>
          </div>
        )}
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
            onKeyDown={(e) => e.key === "Enter" && getReply()}
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
