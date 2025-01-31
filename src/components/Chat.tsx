import { SendHorizontal } from 'lucide-react';
import { useBasic, useQuery } from '@basictech/react';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useShortcut } from '../hooks/useShortcut';

export default function Chat({ currentChatId, setCurrentChatId }: { currentChatId: string, setCurrentChatId: (id: string) => void }) {
    const [message, setMessage] = useState('');
    const { db } = useBasic();
    const messages = useQuery(() => db.collection('messages').getAll());
    const currentMessages = messages?.filter((message: any) => message.chat_id === currentChatId);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { sendButtonTooltipStyles } = useShortcut();

    const addUserMessage = async (message: string) => {
        let chatId = currentChatId;
        if (chatId === '') {
            const newChatId = await db.collection('chats').add({
                title: 'yapping...',
                created_at: new Date().toISOString()
            });
            chatId = newChatId;
            setCurrentChatId(newChatId);
        }

        db.collection('messages').add({
            role: 'user',
            content: message,
            chat_id: chatId,
            created_at: new Date().toISOString()
        });
        setMessage('');
        generateResponse(message, chatId);
    }

    const generateResponse = async (message: string, chatId: string) => {
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
                chat_id: chatId,
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
            <ul className="list-disc ml-4 space-y-1 my-2 [&>li]:pl-1">{props.children}</ul>
        ),
        li: (props: any) => (
            <li>
                <div className="inline">{props.children}</div>
            </li>
        ),
        code: (props: any) => {
            const { children } = props;
            return (
                <code className="bg-[var(--pink-100)] dark:bg-[var(--pink-900)] px-4 py-0.5 rounded font-mono text-sm">
                    {children}
                </code>
            );
        },
        pre: (props: any) => {
            const codeText = props.children.props.children;
            const [copyText, setCopyText] = useState('Copy');

            const handleCopy = () => {
                navigator.clipboard.writeText(codeText);
                setCopyText('Copied!');
                setTimeout(() => {
                    setCopyText('Copy');
                }, 400);
            };

            return (
                <div className="relative">
                    <pre className="bg-[var(--pink-100)] dark:bg-[var(--pink-900)] p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm">
                        {props.children}
                    </pre>
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-[var(--pink-200)] dark:bg-[var(--pink-800)] hover:bg-[var(--pink-300)] dark:hover:bg-[var(--pink-700)] transition-colors"
                    >
                        {copyText}
                    </button>
                </div>
            );
        },
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
            {currentMessages?.length > 0 && <div className="overflow-y-auto pt-5 px-2 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[var(--pink-200)] dark:[&::-webkit-scrollbar-thumb]:bg-[var(--pink-800)] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:visible [&::-webkit-scrollbar-thumb]:invisible">
                {currentMessages?.map((message: any, index: any) => (
                    <div key={index} className={`flex mb-5 gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} text-left`}>
                        {/* Message Bubble */}
                        <div className={`max-w-[70%] p-3 rounded-xl ${message.role === 'user' ? 'dark:bg-[var(--pink-700)] bg-[var(--pink-400)]' : 'bg-transparent'}`}>
                            {message.role === 'assistant' ? (
                                message.content
                                    .split(/(<think>.*?<\/think>)/gs)
                                    .map((part: any) => {
                                        if (part.startsWith('<think>') && part.endsWith('</think>')) {
                                            const thoughtContent = part.replace(/<\/?think>/g, '').trim();
                                            return thoughtContent ? (
                                                <span>
                                                    <p className="text-xs text-bold italics text-[var(--pink-500)] underline">internal thoughts</p>
                                                    <i className="text-xs text-[var(--pink-500)]">
                                                        {thoughtContent.split('\n').map((line: string, i: number) => (
                                                            <span key={i} className="block mb-5">{line}</span>
                                                        ))}
                                                    </i>
                                                </span>
                                            ) : null;
                                        }

                                        return part.split(/([^<]*<\/think>|<think>[^<\n]*)/g).map((subPart: any, i: any) => {
                                            if (subPart.startsWith('<think>')) {
                                                const thoughtContent = subPart.replace('<think>', '').trim();
                                                return thoughtContent ? (
                                                    <span key={i}>
                                                        <i className="text-xs text-[var(--pink-500)]">
                                                            {thoughtContent.split('\n').map((line: string, j: number) => (
                                                                <span key={j} className="block mb-5">{line}</span>
                                                            ))}
                                                        </i>
                                                    </span>
                                                ) : null;
                                            } else if (subPart.endsWith('</think>')) {
                                                const thoughtContent = subPart.replace('</think>', '').trim();
                                                return thoughtContent ? (
                                                    <span key={i}>
                                                        <p className="text-xs text-bold italics text-[var(--pink-500)] underline">internal thoughts</p>
                                                        <i className="text-xs text-[var(--pink-500)]">
                                                            {thoughtContent.split('\n').map((line: string, j: number) => (
                                                                <span key={j} className="block mb-5">{line}</span>
                                                            ))}
                                                        </i>
                                                    </span>
                                                ) : null;
                                            }
                                            return (
                                                <span key={i}>
                                                    <ReactMarkdown components={{
                                                        ...markdownComponents,
                                                        p: (props: any) => (
                                                            <p className="mb-5">{props.children}</p>
                                                        ),
                                                    }}>{subPart}</ReactMarkdown>
                                                </span>
                                            );
                                        });
                                    })
                            ) : (
                                <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
                            )}
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
                        className={`p-2.5 rounded-r-lg border-none bg-[var(--pink-600)] text-white cursor-pointer flex items-center ${sendButtonTooltipStyles}`}
                        onClick={() => addUserMessage(message)}
                        data-tip="⏎ enter"
                    >
                        <SendHorizontal size={20} />
                    </button>
                </div>
                <p className="text-center text-sm text-gray-500 my-2">Please note that Loca is an experimental product.</p>
            </div>
        </div>
    )
}
