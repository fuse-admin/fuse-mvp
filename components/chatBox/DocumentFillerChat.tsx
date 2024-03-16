'use client';
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { FunctionCallHandler, nanoid } from 'ai';
import { checkClientInList } from '@/app/api/firm-clients/clients';
import { generateSuccessResponse } from '@/lib/utils';
import ReactMarkdown from "react-markdown";
import { useAuth } from '@clerk/nextjs';
import OrganizationSetter from '../shared/OrganizationSetter';
import { GenericClientData, TrainingData, DynamicFields } from '@/types';

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

const findDocMapping = async (fundName: string, orgId: string): Promise<TrainingData | null> => {
    console.log('Finding document mapping for fund:', fundName);

        const response = await fetch('/api/findDocMapping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({fundName: fundName, orgId: orgId})
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Document mapping found:', responseData);
            console.log('Type of response data:', typeof responseData);
            return responseData;
        } else {
            throw new Error('Error finding document training for this fund.');
        }
}

const fillSubDoc = async (clientData: GenericClientData, docMappingData: TrainingData): Promise<string | null> => {
    fetch('/api/fillSubDoc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({clientData, docMappingData})
    })
    .then(response => response.blob())
    .then(blob => {
        // Create a link to download the filled PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filled_subscription_document.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error in filling subscription document:', error));
    return null;
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
                    chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} not found in client database. Please check the client list to ensure` });
                    return;
                }
                //chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} found in client database! Filling W-9...` });
                // Fill W-9 form
                await fillW9(clientData);
                return generateSuccessResponse(chatMessages, `W-9 form filled! Check your downloads folder for the filled form.`);
            } else {
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Cannot find the organization you are a part of. Please confirm your organization in the header or on the Team Settings page of the Dashboard.` });
                return;
            }
        }

        if (functionCall.name === 'fill-subscription-documents'){
            const clientName = JSON.parse(functionCall.arguments ?? '{}').name ?? '';
            let formattedClientName = clientName
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            const fundName = JSON.parse(functionCall.arguments ?? '{}').fund ?? '';
            let formattedFundName = fundName
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` Searching for client ${formattedClientName}...` });
            // Check for type of orgID
            if (typeof orgId === 'string') {
                // Get client info from database
                const clientData = await checkClientInList(clientName, orgId);
                if (!clientData) {
                    chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} not found in client database. Please check the client list to ensure.` });
                    return;
                }
                chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: ` ${formattedClientName} found in client database! Filling the subscription document...` });
                const docMappingData = await findDocMapping(fundName, orgId);
                if (!docMappingData) {
                    chatMessages.push({ id: nanoid(), name: 'System', role: 'system', content: `There was an error finding ${formattedFundName} in the database. Please check the Fund List to ensure there is training data for this fund.` });
                    return;
                }
                // Fill subscription documents
                await fillSubDoc(clientData, docMappingData);
                return generateSuccessResponse(chatMessages, `Subscription document for ${docMappingData.fundName} filled! Check your downloads folder for the filled document.`);
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
                    <div className="absolute bottom-5 w-4/5">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="w-3/6 border-none bg-transparent p-2 text-md font-bold placeholder-gray-400 focus:outline-none animate-bounce focus-within:animate-none"
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