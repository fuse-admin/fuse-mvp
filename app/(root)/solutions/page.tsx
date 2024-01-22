import React from 'react'
import { Archivo } from 'next/font/google';
import { Button } from '@/components/ui/button';

const archivo = Archivo({ subsets: ["latin"] })

const Services = () => {
  return (
    <div className='flex flex-col gap-10 p-3'>
      <div className='flex flex-col p-3 gap-10'>
        <h1 className={`${archivo.className} text-6xl font-semibold md:text-6xl text-yellow-500 animate-in slide-in-from-top-0`}>At Fuse, we believe simplicity is nature's first step</h1>
        <p className='text-xl mt-3 md:text-3xl'>We offer modules that tackle each of the issues plaguing alts operations</p>
      </div>
      <ul className='flex flex-col gap-5 md:flex-row'>
        <li className='flex flex-col items-center justify-center'>
          <h1 className={`${archivo.className} text-4xl  text-yellow-500 font-semibold mb-3 text-center md:text-3xl`}>Document Filler</h1>
          <img 
            src="/assets/images/pdf_filler.svg"
            width={200}
            height={200}
            loading='eager'
            className='border-4 p-2 border-yellow-500 rounded-full shadow-xl'
            alt='pdf filler' />
          <p className='text-center text-lg ml-2 mt-2 mr-3'>Connect your CRM and fill out your subscription and custodian docs in minutes</p>
        </li>
        <li className='flex flex-col items-center justify-center'>
          <h1 className={`${archivo.className} text-4xl font-semibold mb-3  text-yellow-500 text-center md:text-3xl`}>Document Query</h1>
          <img 
            src="/assets/images/document_query.svg"
            width={200}
            height={200}
            loading='eager'
            className='border-4 p-2 border-yellow-500 rounded-full shadow-xl'
            alt='document query' />
          <p className='text-center text-lg ml-2 mt-2 mr-3'>Easily find the answers to your questions about your clients' investments</p>
        </li>
        <li className='flex flex-col items-center justify-center'>
          <h1 className={`${archivo.className} text-4xl  text-yellow-500 font-semibold mb-3 text-center md:text-3xl`}>Dynamic Reporting</h1>
          <img 
            src="/assets/images/dynamic_reporting.svg"
            width={200}
            height={200}
            loading='eager'
            className='border-4 p-2 border-yellow-500 rounded-full shadow-xl'
            alt='dynamic reporting' />
          <p className='text-center text-lg ml-2 mt-2 mr-3'>Put together a report of what you want to see and how you want to see it</p>
        </li>
      </ul>
      <Button className="w-auto mt-5 relative self-center p-3 border-2 border-yellow-500 md:text-2xl md:animate-bounce hover:bg-yellow-500 hover:text-white" variant="outline">
          <a href='/demo'>
            Get A Preview of These Products
          </a>
        </Button>
    </div>
  )
}

export default Services