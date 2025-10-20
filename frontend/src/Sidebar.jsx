import './sidebar.css';
import { useContext } from 'react';
import { MyContext } from './MyContext.jsx';

export default function SideBar() {
  const { threads, setThreads, setCurrThreadId, setMessages, currThreadId } = useContext(MyContext);

  // Click existing thread
  const handleThreadClick = (thread) => {
    setCurrThreadId(thread.threadId);
    setMessages(thread.messages);
  };

  // Create new chat
  const handleNewChat = async () => {
    try {
      const response = await fetch('https://my-app-grd4.onrender.com/api/thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat', messages: [] })
      });
      if (!response.ok) throw new Error('Failed to create new thread');

      const newThread = await response.json();
      setThreads(prev => [newThread, ...prev]);
      setCurrThreadId(newThread.threadId);
      setMessages([]);
    } catch (err) {
      console.error('Error creating new chat:', err);
    }
  };

  // Delete thread
  const handleDeleteThread = async (threadId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this thread?")) return;

    try {
      const response = await fetch(`https://my-app-grd4.onrender.com/api/thread/${threadId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete thread');

      setThreads(prev => prev.filter(t => t.threadId !== threadId));

      if (currThreadId === threadId) setMessages([]);
    } catch (err) {
      console.error('Error deleting thread:', err);
    }
  };

  return (
    <section className="sidebar">
      <div className="top-section">
        <img className="logo" src="/ChatGPT-Logo.png" alt="ChatGPT Logo" />
      </div>

      <button className="new-chat" onClick={handleNewChat}>
        <span>+ New Chat</span>
      </button>

      <ul className="History">
        {threads.map(thread => (
          <li
            key={thread.threadId}
            className={thread.threadId === currThreadId ? 'activeThread' : ''}
            onClick={() => handleThreadClick(thread)}
          >
            <span className="thread-title">{thread.title}</span>
            <span
              className="delete-thread-icon"
              onClick={(e) => handleDeleteThread(thread.threadId, e)}
              title="Delete thread"
            >
              🗑️
            </span>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Subrat Sethi ❤️</p>
      </div>
    </section>
  );
}
