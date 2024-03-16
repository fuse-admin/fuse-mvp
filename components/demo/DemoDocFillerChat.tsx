'use client';
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { FunctionCallHandler, nanoid } from 'ai';
import { demoCheckClientInList } from '@/app/api/firm-clients/clients';
import { generateSuccessResponse } from '@/lib/utils';
import ReactMarkdown from "react-markdown";
import { GenericClientData } from '@/types';

const fillW9 = async (clientData: GenericClientData): Promise<string | null> => {
    fetch('/api/fillW9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
    })
    .then(response => response.blob())
    .then(blob => {
        // Create a link to download the filled PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filled_fw9.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error in filling W-9 form:', error));
    return null;
}

const fillDemoSubDoc = async (clientData: GenericClientData): Promise<string | null> => {
    fetch('/api/fillDemoSubDoc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
    })
    .then(response => response.blob())
    .then(blob => {
        // Create a link to download the filled PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filled_ironwood.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error in filling Ironwood Sub-doc:', error));
    return null;
}


export default function DemoDocFillerChat() {
    // Define function call handler
    const functionCallHandler: FunctionCallHandler = async(chatMessages, functionCall) => {
        console.log('Function call handler called: ', functionCall);

        // Run appropriate function
        if (functionCall.name === 'fill-W-9'){
            // Ensure client name is always a string 
            const clientName = JSON.parse(functionCall.arguments ?? '{}').name ?? '';
            let formattedClientName = clientName
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Searching for client ${formattedClientName}...` });

            // Get client info from database
            const clientData = await demoCheckClientInList(clientName);
            console.log(clientData)
            if (!clientData) {
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} not found in client database. Please check the client list to ensure` });
                return;
            }
            //chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} found in client database! Filling W-9...` });
            // Fill W-9 form
            await fillW9(clientData);
            return generateSuccessResponse(chatMessages, `W-9 form filled! Check your downloads folder for the filled form.`);
        }
        if (functionCall.name === 'fill-subscription-documents'){
            // Ensure client name is always a string 
            const clientName = JSON.parse(functionCall.arguments ?? '{}').name ?? '';
            let formattedClientName = clientName
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Searching for client ${formattedClientName}...` });

            // Get client info from database
            const clientData = await demoCheckClientInList(clientName);
            console.log(clientData)
            if (!clientData) {
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} not found in client database. Please check the client list to ensure` });
                return;
            }
            //chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} found in client database! Filling W-9...` });
            // Fill Ironwood sub-doc
            await fillDemoSubDoc(clientData);
            return generateSuccessResponse(chatMessages, `Ironwood Sub-doc filled! Check your downloads folder for the filled document.`);
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
        <div className="grid grid-rows-2">
            <section ref={messagesContainerRef} className="flex-grow overflow-auto mb-10 max-h-[65vh]">
            {filteredMessages.map((m) => (
                <div className={`text-md p-3 ${m.role === 'user' ? 'font-extrabold' : 'text-gray-500'}`} key={m.id}>
                    {m.role === 'user' ? (
                        <p className='font-semibold'>You: {m.content}</p>
                    ) : (
                        <div>
                        FuseBot: {m.content.split('\n').map((line, index) => {
                            // Check if line contains Markdown indicators like "**" or "##"
                            const hasMarkdown = /(\*\*|##)/.test(line);
                            return (
                                <span key={index}>
                                    {hasMarkdown ? (
                                        <ReactMarkdown children={line} />
                                    ) : (
                                        <>
                                            {line}
                                            <br />
                                        </>
                                    )}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        ))}
        </section>
                {/* Chat Input */}
                <div className="p-4">
                    <div className="absolute bottom-5 w-8/12">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="w-3/6 border-none bg-transparent p-2 text-md font-bold placeholder-gray-400 focus:outline-none"
                            value={input}
                            placeholder="Ask a question or put your request here..."
                            onChange={handleInputChange}
                        />
                    </form>
                    <div className="absolute bottom-0 w-3/6 border-b-2 border-gray-400"></div>
                    </div>
                </div>
            </div>
    );
}