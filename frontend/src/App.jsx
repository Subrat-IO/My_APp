import { useState } from 'react'
import './App.css'
import SideBar from './Sidebar'
import ChatWindow from './ChatWindow'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SideBar></SideBar>
   <ChatWindow></ChatWindow>
    
   
  </>
  )
}

export default App
