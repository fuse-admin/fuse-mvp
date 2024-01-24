'use client';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { ChatRequest, FunctionCallHandler, nanoid } from 'ai';
import { checkClientInList } from '@/app/api/firm-clients/clients';
import { generateSuccessResponse } from '@/lib/utils';
 
export default function DocumentFillerChat() {
    const functionCallHandler: FunctionCallHandler = async(chatMessages, functionCall) => {
        console.log('Function call handler called: ', functionCall);

        // Run appropriate function
        if (functionCall.name === 'fill-W-9'){
            // Ensure client name is always a string 
            const clientName = JSON.parse(functionCall.arguments ?? '{}').name ?? '';
            chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: `Searching for client ${clientName}...` });
            // Get client info from database
            const clientData = await checkClientInList(clientName);
            if (!clientData) {
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: `${clientName} not found in client database.` });
                return;
            }
            return generateSuccessResponse(chatMessages, "hello world")
        }
    };
    
    
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        experimental_onFunctionCall: functionCallHandler,
    });

    // Remove any initial empty AI messages
    const filteredMessages = messages.filter(m => m.role !== 'assistant' || m.content.trim() !== '');

    //Create a ref for the chat messages container(Auto-scroll)
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    //Scroll to the bottom of the chat messages container when a new message is added
    useEffect(() => {
        if (messagesContainerRef.current) {
        const { scrollHeight, clientHeight } = messagesContainerRef.current;
        messagesContainerRef.current.scrollTo({
            left: 0,
            top: scrollHeight - clientHeight,
            behavior: 'smooth',
        });
    }
    }, [messages]);
 
    return (
    <div className="flex flex-col w-full h-full p-3">
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent dark:from-black dark:to-transparent"></div>
        {/* Style the chat output messages */}
        <section ref={messagesContainerRef} className="flex-grow overflow-auto p-6 space-y-2 pt-10 mb-10">
            {filteredMessages.map((m) => (
            <div className={`text-xl p-3 ${m.role === 'user' ? 'font-extrabold' : 'font-extralight text-gray-500 dark:text-gray-400'}`} key={m.id}>
                {m.role === 'user' ? (
                <p className='font-semibold'>User: {m.content}</p>
                ) : (
                <p>
                    AI:{' '}
                    {m.content.split('\n').map((line, index) => (
                    <span key={index}>
                        {line.includes('Writing and Editing Assistance') ? (
                        <strong>{line}</strong>
                        ) : (
                        line
                        )}
                        <br />
                    </span>
                    ))}
                </p>
                )}
            </div>
            ))}
        </section>
        <div className="p-4">
            <div className="absolute bottom-0 w-1/2">
            <form onSubmit={handleSubmit}>
                <input
                    className="w-3/4 border-none bg-transparent p-2 text-lg font-bold placeholder-gray-400 focus:outline-none"
                    value={input}
                    placeholder="Ask a question or put your request here..."
                    onChange={handleInputChange}
                />
            </form>
            <div className="absolute bottom-0 w-3/4 border-b-2 border-gray-400"></div>
            </div>
        </div>
    </div>
    );
}