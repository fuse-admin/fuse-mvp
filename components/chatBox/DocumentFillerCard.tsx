"use client";
import { Archivo } from 'next/font/google';
import { Button } from '../ui/button';
import { ClientModal } from './ClientModal';
import { useState } from 'react';
import ClientDataTable from '@/app/(root)/my-clients/data-table';

const archivo = Archivo({ subsets: ["latin"] })

export default function DocumentFillerCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <main className="flex flex-col gap-5">
            <section className="flex flex-col mt-10 gap-3">
                <h1 className={`${archivo.className} text-4xl text-center font-bold`}>Document Filler</h1>
                <p className="p-3 text-justify text-lg">
                    To fill out a subscription document, custodian document, or W-9, please enter in the chat what you want to 
                    fill out and who for.
                </p>
                <p className="p-3 text-justify text-lg">
                    For example, if you want to fill out a subscription document or W-9 for a client, you would type in the chat:
                </p>
                <p className="p-3 text-center text-lg font-bold">
                    "Fill out the Ironwood sub doc for Sansa Stark" or "Fill out a W-9 for Jon Snow"
                </p>
                <p className="p-3 text-justify text-lg">
                    Provided that the document is in our database, the system will then fill it out.
                </p>
                <p className="p-3 text-justify text-lg">
                    If you want to fill out a new document, please click the button below and the system will walk you through the process!
                </p>
            </section>
            <section className='flex flex-col justify-center items-center mt-10 gap-5'>
                <Button 
                    className='w-1/2 h-10 text-2xl font-bold text-black bg-yellow-500 hover:bg-yellow-600 rounded-2xl shadow-lg'>
                        Train a new sub-doc
                </Button>
                <Button
                    onClick={openModal} 
                    className='w-1/2 h-10 text-2xl font-bold text-black bg-yellow-500 hover:bg-yellow-600 rounded-2xl shadow-lg'>
                        View my clients
                </Button>
            </section>
            <ClientModal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className={`${archivo.className} text-4xl font-extrabold text-yellow-500 mb-4 text-center`}>My Clients</h2>
                <ClientDataTable />
            </ClientModal>
        </main>
    )
}