import { SendHorizontal } from 'lucide-react';
import { useBasic, useQuery } from '@basictech/react';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat({ currentChatId }: { currentChatId: string }) {
    const [message, setMessage] = useState('');
    const { db } = useBasic();
    const messages = useQuery(() => db.collection('messages').getAll());
    const currentMessages = messages?.filter((message: any) => message.chat_id === currentChatId);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const addUserMessage = (message: string) => {
        db.collection('messages').add({
            role: 'user',
            content: message,
            chat_id: currentChatId,
            created_at: new Date().toISOString()
        });
        setMessage('');
        generateResponse(message);
    }

    const generateResponse = async (message: string) => {
        const cleanedMessages = currentMessages?.map((message: any) => ({
            role: message.role,
            content: message.content,
        }));

        cleanedMessages.push({
            role: 'user',
            content: message,
        });

        const response = await fetch('https://loca-server.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-r1-distill-llama-70b',
                messages: cleanedMessages,
            }),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });

        if (response.response.choices.length > 0) {
            const assistantMessage = response.response.choices[0].message.content;
            db.collection('messages').add({
                role: 'assistant',
                content: assistantMessage,
                chat_id: currentChatId,
                created_at: new Date().toISOString()
            });
        }
    }

    const markdownComponents = {
        h1: (props: any) => (
            <h1 className="text-2xl font-bold my-4">{props.children}</h1>
        ),
        h2: (props: any) => (
            <h2 className="text-xl font-bold my-3">{props.children}</h2>
        ),
        h3: (props: any) => (
            <h3 className="text-lg font-bold my-2">{props.children}</h3>
        ),
        strong: (props: any) => (
            <strong className="font-bold">{props.children}</strong>
        ),
        em: (props: any) => (
            <em className="italic">{props.children}</em>
        ),
        ul: (props: any) => (
            <ul className="list-disc list-inside space-y-1 my-2">{props.children}</ul>
        ),
        li: (props: any) => (
            <li className='ml-4 pl-4 -indent-5.5'>{props.children}</li>
        ),
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    return (
        <div className={`flex flex-col ${currentMessages?.length > 0 ? 'justify-between' : 'justify-center'} h-full w-full`}>
            {/* Text bubbles area */}
            {currentMessages?.length > 0 && <div className="overflow-y-auto pt-5 px-2 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-pink-900 [&::-webkit-scrollbar-thumb]:rounded-full">
                {currentMessages?.map((message: any, index: any) => (
                    <div key={index} className={`flex mb-5 gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} text-left`}>
                        {/* Message Bubble */}
                        <div className={`max-w-[70%] p-3 rounded-xl ${message.role === 'user' ? 'bg-[#3F4D4E]' : 'bg-transparent'}`}>
                            {console.log('Message content:', message.content)}
                            {message.content
                                // First split on complete think tags
                                .split(/(<think>.*?<\/think>)/gs)
                                .map((part: any) => {
                                    // If this is a complete think tag, process it
                                    if (part.startsWith('<think>') && part.endsWith('</think>')) {
                                        const thoughtContent = part.replace(/<\/?think>/g, '');
                                        return (
                                            <span>
                                                <p className="text-xs text-bold italics text-gray-500">thinking...</p>
                                                <i className="text-xs text-gray-500">{thoughtContent}</i>
                                                <br />
                                                <br />
                                            </span>
                                        );
                                    }

                                    // For remaining parts, split and process any incomplete think tags
                                    return part.split(/([^<]*<\/think>|<think>[^<\n]*)/g).map((subPart: any, i: any) => {
                                        if (subPart.startsWith('<think>')) {
                                            const thoughtContent = subPart.replace('<think>', '');
                                            return (
                                                <span key={i}>
                                                    <p className="text-xs text-bold italics text-gray-500">thinking...</p>
                                                    <i className="text-xs text-gray-500">{thoughtContent}</i>
                                                    <br />
                                                    <br />
                                                </span>
                                            );
                                        } else if (subPart.endsWith('</think>')) {
                                            const thoughtContent = subPart.replace('</think>', '');
                                            return (
                                                <span key={i}>
                                                    <p className="text-xs text-bold italics text-gray-500">thinking...</p>
                                                    <i className="text-xs text-gray-500">{thoughtContent}</i>
                                                    <br />
                                                    <br />
                                                </span>
                                            );
                                        }
                                        return (
                                            <span key={i}>
                                                <ReactMarkdown components={markdownComponents}>{subPart}</ReactMarkdown>
                                            </span>
                                        );
                                    });
                                })}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>}

            {/* Input area */}
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <input
                        className="flex-1 py-2 px-4 rounded-l-lg border-t border-l border-b border-[#353126] border-r-0 bg-transparent focus:outline-none"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && message.trim()) {
                                addUserMessage(message);
                            }
                        }}
                        placeholder={`${currentMessages?.length > 0 ? 'Continue the conversation...' : 'Ponder about the universe...'}`}
                    />
                    <button
                        className="p-2.5 rounded-r-lg border-none bg-[#B18076] text-white cursor-pointer flex items-center"
                        onClick={() => addUserMessage(message)}
                    >
                        <SendHorizontal size={20} />
                    </button>
                </div>
                <p className="text-center text-sm text-gray-500 my-2">Please note that Loca is an experimental product.</p>
            </div>
        </div>
    )
}
