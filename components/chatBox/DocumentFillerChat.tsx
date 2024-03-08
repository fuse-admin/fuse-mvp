'use client';
import { useChat } from "ai/react";
import { use, useEffect, useRef } from "react";
import { FunctionCallHandler, nanoid } from 'ai';
import { checkClientInList } from '@/app/api/firm-clients/clients';
import { generateErrorResponse, generateSuccessResponse } from '@/lib/utils';
import ReactMarkdown from "react-markdown";
import { useAuth, auth, currentUser } from '@clerk/nextjs';
import OrganizationSetter from '../shared/OrganizationSetter';
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

const findDocMapping = async (fundName: string) => {
    const response = await fetch('/api/findDocMapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fundName })
    });
    if (response.ok){
        return response.json();
    } else {
        console.error('Error finding document mapping:', response);
        return null;
    }
}

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
            let formattedClientName = clientName
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            //chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Searching for client ${formattedClientName}...` });
            // Check for type of orgID 
            if (typeof orgId === 'string') {
                // Get client info from database
                const clientData = await checkClientInList(clientName, orgId);
                console.log(clientData)
                if (!clientData) {
                    //chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} not found in client database. Please check the client list to ensure` });
                    return generateErrorResponse(chatMessages, ` ${formattedClientName} not found in client database. Please check the client list to ensure.`);
                    //return;
                }
                //chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} found in client database! Filling W-9...` });
                // Fill W-9 form
                await fillW9(clientData);
                return generateSuccessResponse(chatMessages, `W-9 form filled! Check your downloads folder for the filled form.`);
            } else {
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Cannot find the organization you are a part of. Please confirm your organization on the Team Settings page on the Dashboard.` });
                return;
            }
        }
        if (functionCall.name === 'fill-subscription-documet'){
            const clientName = JSON.parse(functionCall.arguments ?? '{}').name ?? '';
            let formattedClientName = clientName
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            const fundName = JSON.parse(functionCall.arguments ?? '{}').fund ?? '';
            chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Searching for client ${formattedClientName}...` });
            // Check for type of orgID
            if (typeof orgId === 'string') {
                // Get client info from database
                const clientData = await checkClientInList(clientName, orgId);
                if (!clientData) {
                    return generateErrorResponse(chatMessages, ` ${formattedClientName} not found in client database. Please check the client list to ensure.`);
                }
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} found in client database! Filling subscription document for ${fundName}...` });
                // Find document mapping
                const docMapping = await findDocMapping(fundName);
                if (!docMapping) {
                    return generateErrorResponse(chatMessages, `Error finding document mapping for ${fundName}. Please confirm that you have trained a document for this fund.`);
                }
                // Fill subscription document
                //await fillSubscriptionDocument(clientData, docMapping);
                return generateSuccessResponse(chatMessages, `Document filled for ${fundName}! Check your downloads folder for the filled form.`);
            } else {
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Cannot find the organization you are a part of. Please confirm your organization on the Team Settings page available on the Dashboard.` });
                return;
            }
        }
    };
    // Set up chat
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
            <section ref={messagesContainerRef} className="flex-grow overflow-auto mb-10 max-h-[600px] md:h-[700px]">
            {filteredMessages.map((m) => (
                <div className={`text-md p-3 ${m.role === 'user' ? 'font-extrabold' : 'text-gray-500'}`} key={m.id}>
                    {m.role === 'user' ? (
                        <p className='font-semibold'>You: {m.content}</p>
                    ) : (
                        <div>
                        AI: {m.content.split('\n').map((line, index) => {
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
                    <div className="absolute bottom-1 w-8/12">
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