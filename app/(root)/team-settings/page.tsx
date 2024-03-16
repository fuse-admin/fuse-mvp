import React from 'react'
import { OrganizationSwitcher, OrganizationProfile, auth } from "@clerk/nextjs";
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ["latin"] })

const TeamSettings = () => {
  const { orgId } = auth()

  if (!orgId) {
    return (
      <main className='h-screen w-screen flex flex-col p-10 gap-10'>
        <section>
          <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl`}>Team Settings</h1>
        </section>
        <section>
          <div className='flex flex-col justify-center items-center gap-10'>
            <h2 className='text-3xl text-gray-500'>You currently have no organization selected</h2>
            <p className='text-xl'>Please create or select one in the header</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className='h-screen w-screen flex flex-col p-10 gap-10'>
      <section>
        <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl`}>Team Settings</h1>
      </section>
      <section>
        <div className='flex-1 flex justify-center items-center'>
          <OrganizationProfile />
        </div>
      </section>
    </main>
  )
}

export default TeamSettings