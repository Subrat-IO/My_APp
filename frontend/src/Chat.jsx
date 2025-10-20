import React, { useContext, useEffect, useRef } from "react";
import { MyContext } from "./MyContext.jsx";
import './ChatWindow.css';

export default function Chat() {
  const { messages } = useContext(MyContext);
  const chatEndRef = useRef(null);

  // scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="Chat">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={msg.role === "user" ? "userMessage" : "assistantMessage"}
        >
          {msg.content}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
