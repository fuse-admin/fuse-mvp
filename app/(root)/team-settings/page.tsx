import React from 'react'
import { OrganizationSwitcher, OrganizationProfile } from "@clerk/nextjs";
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ["latin"] })

const TeamSettings = () => {
  return (
    <main className='flex flex-col justify-center items-center gap-3'>
      <h1 className={`${archivo.className} text-center text-4xl text-yellow-500 font-bold`}>Team Settings</h1>
      <div className='flex flex-col justify-center items-center mb-5'>
          <h2 className='font-bold'>Switch Profile</h2>
          <OrganizationSwitcher />
      </div>
        <OrganizationProfile />
    </main>
  )
}

export default TeamSettings