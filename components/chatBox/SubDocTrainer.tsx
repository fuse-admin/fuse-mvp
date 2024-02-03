import React from 'react'
import { Archivo } from 'next/font/google'

const archivo = Archivo({ subsets: ["latin"] })

const SubDocTrainer = () => {
  return (
    <main className='flex flex-row gap-3 w-full h-full'>
        <section className='w-1/2 h-96 rounded-lg p-4 flex flex-col gap-3' title='Sub-doc viewer'>
          <h1 className={`${archivo.className} text-2xl text-yellow-500 font-extrabold text-center`}>Subscription Document</h1>
        </section>
        <section className='w-1/2 h-96 rounded-lg p-4 flex flex-col gap-3' title='Field-name dict creator'>
          <h1 className={`${archivo.className} text-2xl text-yellow-500 font-extrabold text-center`}>Field Name Selector</h1>
        </section>
    </main>
  )
}

export default SubDocTrainer