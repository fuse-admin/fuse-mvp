import { Archivo } from 'next/font/google'
import React from 'react'

const archivo = Archivo({ subsets: ["latin"] })

const ContactUs = () => {
  return (
    <main className='h-screen w-screen flex flex-col p-10'>
      <section>
        <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl`}>Contact Us</h1>
      </section>
      <section>
        <div className='flex flex-col justify-start'>
        </div>
        <div className='flex-1 flex justify-center items-center'>
        </div>
      </section>
        


    </main>
  )
}

export default ContactUs