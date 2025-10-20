import { useState } from 'react'
import './App.css'
import SideBar from './Sidebar'
import ChatWindow from './ChatWindow'
import { MyContext } from './MyContext.jsx'
import{v1 as uuidv1} from "uuid"

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null); // ✅ fixed syntax: useState(null) not useState[null]
const [currThreadId, setCurrThreadId] = useState(uuidv1);
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply
  };

  return (
    <MyContext.Provider value={providerValues}>
      <div className="app-container"> {/* ✅ Added wrapper for layout */}
        <SideBar />
        <ChatWindow />
      </div>
    </MyContext.Provider>
  );
}

export default App;
