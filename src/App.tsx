import './App.css'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

function App() {
  const [currentChatId, setCurrentChatId] = useState('currentChatId');

  return (
    <div className="flex w-[100vw] h-screen">
      <div className="flex hidden md:block">
        <Sidebar setCurrentChatId={setCurrentChatId} />
      </div>
      <div className="flex w-[800px] min-w-[320px] mx-auto px-5">
        <Chat currentChatId={currentChatId} />
      </div>
    </div>
  )
}

export default App
