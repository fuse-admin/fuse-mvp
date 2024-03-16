"use client";
import { Archivo } from 'next/font/google';
import { useState } from 'react';
import Loader from '../shared/Loading';

const archivo = Archivo({ subsets: ["latin"] })

export default function ReportingCard() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <main className="flex flex-col gap-5">
            {isLoading ? (
                <Loader />
            ) : (
            <> 
                <section className="flex flex-col gap-3">
                    <h1 className={`${archivo.className} text-4xl text-center font-bold`}>Reporting</h1>
                </section>
                <section className='flex flex-col justify-center items-center mt-10'>
                </section>
            </>
            )}
        </main>
    )
}