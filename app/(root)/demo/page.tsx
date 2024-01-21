import { Archivo } from 'next/font/google'
import React from 'react'

const archivo = Archivo({ subsets: ["latin"] })

const Demo = () => {
  return (
    <main className='flex p-3 font-extrabold flex-col'>
      <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-6xl p-5`}>Demo</h1>
        <p>This is the demo. You're welcome!</p>
    </main>
  )
}

export default Demo