import React from 'react'
import ClientDataTable from './data-table'
import { Archivo } from 'next/font/google'

const archivo = Archivo({ subsets: ["latin"] })

const MyClients = () => {
  return (
    <main className='h-screen w-screen flex flex-col p-10'>
      <section>
        <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl`}>My Clients</h1>
      </section>
      <section>
        <div className='flex flex-col justify-start'>
          <ClientDataTable />
        </div>
      </section>
        


    </main>
  )
}

export default MyClients