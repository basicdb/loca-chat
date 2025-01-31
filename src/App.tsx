import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import { useState, useEffect } from 'react'
import { useShortcut } from './hooks/useShortcut'
import { useHotkeys } from 'react-hotkeys-hook'
import { useBasic } from '@basictech/react'

function App() {
  const [currentChatId, setCurrentChatId] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { getShortcutText, sidebarTooltipStyles } = useShortcut();
  const { db } = useBasic();

  // Add hotkey handlers
  useHotkeys('alt+s', () => setIsSidebarOpen(!isSidebarOpen), [isSidebarOpen]);
  useHotkeys('alt+n', async () => {
    const newChatId = await db.collection('chats').add({
      title: 'yapping...',
      created_at: new Date().toISOString()
    });
    setCurrentChatId(newChatId);
    if (isSidebarOpen) setIsSidebarOpen(false);
  }, [db, isSidebarOpen]);

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleChatSelection = (chatId: string) => {
    setCurrentChatId(chatId);
    handleSidebarClose();
  };

  useEffect(() => {
    const handleResize = () => {
      // If window width is >= medium breakpoint (768px for default Tailwind md:),
      // ensure sidebar state is closed
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex w-[100vw] h-[100dvh]">
      {/* Burger menu icon for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          className={`p-2 rounded-lg bg-white dark:bg-black ${sidebarTooltipStyles}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          data-tip={getShortcutText('s')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay for closing sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={handleSidebarClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:static md:block z-40 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar
          setCurrentChatId={handleChatSelection}
          currentChatId={currentChatId}
        />
      </div>

      <div className="flex w-[800px] min-w-[320px] mx-auto px-5">
        <Chat currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
      </div>

      {/* Version text */}
      <div className="fixed bottom-2 right-2 text-[10px] text-pink-400">
        v0.3.14 - experimental
      </div>
    </div>
  )
}

export default App
