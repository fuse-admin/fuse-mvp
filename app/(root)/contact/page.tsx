import { Archivo } from 'next/font/google'
import React from 'react'

const archivo = Archivo({ subsets: ["latin"] })

const ContactUs = () => {
  return (
    <main className='flex p-3'>
      <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-6xl p-5`}>Contact Us</h1>
    </main>
  )
}

export default ContactUs