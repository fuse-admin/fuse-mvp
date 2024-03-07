import { Archivo } from 'next/font/google'
import React from 'react'

const archivo = Archivo({ subsets: ["latin"] })

const AboutUs = () => {
  return (
    <main className='flex p-3 font-extrabold'>
        <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-6xl p-5`}>About Us</h1>
    </main>
  )
}

export default AboutUs