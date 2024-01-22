"use client";
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ["latin"] })

export default function QueryCard() {
    return (
        <main className="flex flex-col gap-5">
            <section className="flex flex-col gap-3">
                <h1 className={`${archivo.className} text-4xl text-center font-bold`}>Query</h1>
            </section>
            <section className='flex flex-col justify-center items-center mt-10'>
            </section>
        </main>
    )
}