"use client";
import { Archivo } from 'next/font/google';
import { Button } from '../ui/button';
import { ClientModal } from '../chatBox/ClientModal';
import { useState } from 'react';
import DemoClientDataTable from '@/app/(root)/demo-clients/client-data-table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const archivo = Archivo({ subsets: ["latin"] })

export default function DemoDocFillerCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <main className="flex flex-col gap-5">
            <section className="flex flex-col mt-10 gap-3">
                <h1 className={`${archivo.className} text-2xl text-center font-bold`}>Document Filler</h1>
                <p className="p-3 text-justify text-md">
                    To test out the document filler, please enter in the chat what you want to fill out and who for.
                </p>
                <p className="p-3 text-justify text-md">
                    You can find a full list of clients by clicking the "View my clients" button below.
                </p>
            </section>
            <section className='flex flex-col justify-center items-center mt-10 gap-5'>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Fill Out W-9</AccordionTrigger>
                    <AccordionContent>
                        i. Enter in the chat box that you want to fill out a W-9 and for who. i.e. "I want to fill out a W-9 for George Costanza."
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Fill Out Subscription Doc</AccordionTrigger>
                    <AccordionContent>
                        i. Enter in the chat box that you want to fill out the "Ironwood Sub-Doc" and for who. i.e. "I want to fill out an Ironwood subdoc for Sansa Stark."
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </section>
            <section className='flex flex-col justify-center items-center mt-10 gap-5'>
                <Button
                    onClick={openModal} 
                    className='w-1/2 h-10 text-lg font-bold text-black bg-yellow-500 hover:bg-yellow-600 rounded-2xl shadow-lg'>
                        View my clients
                </Button>
            </section>
            <ClientModal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className={`${archivo.className} text-2xl font-extrabold text-yellow-500 mb-4 text-center`}>My Clients</h2>
                <DemoClientDataTable />
            </ClientModal>
        </main>
    )
}