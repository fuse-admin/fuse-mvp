'use client';
import { useChat } from 'ai/react';
import { use, useEffect, useRef } from 'react';
import { FunctionCallHandler, nanoid } from 'ai';
import { checkClientInList } from '@/app/api/firm-clients/clients';
import { generateSuccessResponse } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { useAuth, auth, currentUser } from '@clerk/nextjs';
import OrganizationSetter from '../shared/OrganizationSetter';

export default function DocumentFillerChat() {
    // Set up organization setter
    <OrganizationSetter />
    // Get organization ID from Clerk for client search
    const {orgId} = useAuth();
    // Define function call handler
    const functionCallHandler: FunctionCallHandler = async(chatMessages, functionCall) => {
        console.log('Function call handler called: ', functionCall);

        // Run appropriate function
        if (functionCall.name === 'fill-W-9'){
            // Ensure client name is always a string 
            const clientName = JSON.parse(functionCall.arguments ?? '{}').name ?? '';
            chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Searching for client ${clientName}...` });
            // Check for type of orgID 
            if (typeof orgId === 'string') {
                // Get client info from database
                const clientData = await checkClientInList(clientName, orgId);
                console.log(clientData)
                if (!clientData) {
                    chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${clientName} not found in client database.` });
                    return;
                }
                return generateSuccessResponse(chatMessages, "hello world")
            } else {
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Cannot find the organization you are a part of. Please confirm your organization on the Team Settings page on the Dashboard.` });
                return;
            }
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
        <div className='absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent'></div>
        {/* Style the chat output messages */}
        <section ref={messagesContainerRef} className="flex-grow overflow-auto p-6 space-y-2 pt-10 mb-10 max-h-[600px]">
    {filteredMessages.map((m) => (
        <div className={`text-xl p-3 ${m.role === 'user' ? 'font-extrabold' : 'font-extralight text-gray-500 dark:text-gray-400'}`} key={m.id}>
            {m.role === 'user' ? (
                <p className='font-semibold'>You: {m.content}</p>
            ) : (
                <p>
                    AI:  
                    {m.content.includes('Writing and Editing Assistance') ? (
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                    ) : (
                        m.content.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))
                    )}
                </p>
            )}
        </div>
    ))}
</section>
        {/* Style the chat input */}
        <div className="p-4">
            <div className="absolute bottom-0 w-1/2">
            <form onSubmit={handleSubmit}>
                <input
                    className="w-3/5 border-none bg-transparent p-2 text-lg font-bold placeholder-gray-400 focus:outline-none"
                    value={input}
                    placeholder="Ask a question or put your request here..."
                    onChange={handleInputChange}
                />
            </form>
            <div className="absolute bottom-0 w-3/5 border-b-2 border-gray-400"></div>
            </div>
        </div>
    </div>
    );
}