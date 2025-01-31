import { useBasic, useQuery } from '@basictech/react';
import { Trash2 } from 'lucide-react';
import { useShortcut } from '../hooks/useShortcut';

export default function Sidebar({ setCurrentChatId, currentChatId }: {
    setCurrentChatId: (id: string) => void,
    currentChatId: string
}) {
    const { signin, signout, user, isSignedIn, db } = useBasic();
    const chats = useQuery(() => db.collection('chats').getAll());
    const { getShortcutText, newChatTooltipStyles } = useShortcut();

    const createNewChat = async () => {
        const newChatId = await db.collection('chats').add({
            title: 'yapping...',
            created_at: new Date().toISOString()
        });

        setCurrentChatId(newChatId);
    }

    const deleteChat = async (e: React.MouseEvent, chatId: string) => {
        e.stopPropagation(); // Prevent triggering the chat selection
        await db.collection('chats').delete(chatId);
        setCurrentChatId('');
    }

    return (
        <div className="h-screen w-64 flex-shrink-0 p-2">
            <div className="h-full flex flex-col justify-between bg-[var(--pink-100)] dark:bg-[var(--pink-900)] rounded-lg p-5 text-black dark:text-white">
                <div>
                    <button
                        onClick={createNewChat}
                        className={`w-full py-2 mb-3 rounded-md text-black dark:text-white cursor-pointer dark:bg-[var(--pink-700)] border border-[var(--pink-700)] dark:hover:bg-[var(--pink-800)] hover:bg-[var(--pink)] z-50 ${newChatTooltipStyles}`}
                        data-tip={getShortcutText('n')}
                    >
                        + new chat
                    </button>
                    {chats?.map((chat: any) => {
                        const isActive = chat.id === currentChatId;
                        return (
                            <div className="relative w-full mb-2" key={chat.id}>
                                <button
                                    className={`w-full text-sm py-2 rounded-sm border border-[0.25px] border-[var(--pink-800)] flex items-center justify-between px-3 ${isActive
                                        ? 'bg-[var(--pink)] dark:bg-[var(--pink-500)] font-medium'
                                        : ''
                                        } hover:bg-[var(--pink-200)] dark:hover:bg-[var(--pink-800)]`}
                                    onClick={() => setCurrentChatId(chat.id)}
                                >
                                    <span className="truncate text-left pr-2">{chat.title}</span>
                                    <span
                                        className="opacity-60 hover:opacity-100"
                                        onClick={(e) => deleteChat(e, chat.id)}
                                    >
                                        <Trash2 size={16} />
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <button className={`w-full ${isSignedIn ? 'text-sm py-2.5' : 'text-md py-2'} mb-3 rounded-md text-black dark:text-white border border-[var(--pink-800)] dark:bg-[var(--pink-800)] dark:hover:bg-[var(--pink-700)] hover:bg-[var(--pink)]`} onClick={isSignedIn ? signout : signin}>
                    {isSignedIn ? 'sign out ' + user?.email : 'sign in'}
                </button>
            </div>
        </div>
    )
}
