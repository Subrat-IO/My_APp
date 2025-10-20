import './sidebar.css';
import { useContext } from 'react';
import { MyContext } from './MyContext.jsx';

export default function SideBar() {
  const { threads, setThreads, setCurrThreadId, setMessages } = useContext(MyContext);

  // Handle clicking an existing thread
  const handleThreadClick = (thread) => {
    setCurrThreadId(thread);
    setMessages(thread.messages);
  };

  // Handle creating a new thread
  const handleNewChat = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat', messages: [] })
      });
      if (!response.ok) throw new Error('Failed to create new thread');

      const newThread = await response.json();
      setThreads(prev => [newThread, ...prev]); // add new thread to top
      setCurrThreadId(newThread);               // switch to new thread
      setMessages(newThread.messages);          // clear messages
    } catch (err) {
      console.error('Error creating new chat:', err);
    }
  };

// Handle deleting a thread with confirmation
const handleDeleteThread = async (threadId, e) => {
  e.stopPropagation(); // prevent triggering thread click

  const confirmDelete = window.confirm("Are you sure you want to delete this thread?");
  if (!confirmDelete) return; // exit if user cancels

  try {
    const response = await fetch(`https://my-app-grd4.onrender.com/api/thread${threadId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete thread');

    setThreads(prev => prev.filter(t => t.threadId !== threadId));

    // If the deleted thread was currently open, clear messages
    setMessages(prev => (prev.threadId === threadId ? [] : prev));
  } catch (err) {
    console.error('Error deleting thread:', err);
  }
};


  return (
    <section className="sidebar">
      {/* Top Left Logo */}
      <div className="top-section">
        <img className="logo" src="/src/assets/ChatGPT-Logo.png" alt="ChatGPT Logo" />
      </div>

      {/* New Chat Button */}
      <button className="new-chat" onClick={handleNewChat}>
        <img className='new-chat-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABbElEQVR4AdSVPUoEMRiGRy20FARF7ETQygt4ATs7G8EbaKWgjT+NgtqpR7D15wriDURUEAsrFSw8gD/POzsJSXYyZIbdhV3eJ/mSL/neTAZ2BrMu//rK4JjL2ABP4RMskX2Evwp+yK2Aq1MGKt5mEhqcs3AOYvolsQoXYDROsAxGMtkyg9BgqkgM0JcxxLxbfJTxJyzAOxjpIHkcGuSTiY2u5Im10/ACMvmgX4MjyNXUQFegq5igyh3MwCvMwhlYNTHYZvchGE0S3MIYfIOnuga6lgOvQmug9/LVCv22joGK61r8Cll2wsQmGC2aQH2qwR6LU4tfsdYqxWCX1YLOU3hyJa9pRsAqxUCntxuKoKy4UsNqXFIM3PWKZejeueai1DVQ4f1otZJEioH7l6GrKSkTn0oxiO9OyPTc4K04VNX3oCqn7Q9qDOETrJN4hqa6Z+MOWIUGN2T0wXFfbJ14nv2XYBUa2ESngq4b/AMAAP//8OC7igAAAAZJREFUAwDGXUIxErFK6gAAAABJRU5ErkJggg==" />
        <span>New Chat</span>
      </button>

      {/* Chat History */}
      <ul className="History">
        {threads.map(thread => (
          <li
            key={thread._id}
            className={thread.threadId === (threads.currThreadId?.threadId) ? 'activeThread' : ''}
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

      {/* Footer / Sign */}
      <div className="sign">
        <p>By Subrat Sethi ❤️</p>
      </div>
    </section>
  );
}
