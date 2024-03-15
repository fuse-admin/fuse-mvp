import React from 'react'
import { OrganizationSwitcher, OrganizationProfile, auth } from "@clerk/nextjs";
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ["latin"] })

const TeamSettings = () => {
  const { orgId } = auth()

  return (
    <main className='h-screen w-screen flex flex-col p-10'>
      <section>
        <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl`}>Team Settings</h1>
      </section>
      <section>
        <div className='flex flex-col justify-start'>
          <h2 className={`${archivo.className} text-xl font-semibold mt-5 mb-1`}>Switch Your Profile</h2>
          <OrganizationSwitcher />
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <OrganizationProfile />
        </div>
      </section>
        


    </main>
  )
}

export default TeamSettings