import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
  <main className='flex h-3/4 justify-center items-center'>
    <div className='flex flex-row flex-wrap justify-center items-center h-full mt-10 w-full gap-5'>
      <Link href='/modules' className='relative w-1/4 h-64 p-5 rounded-2xl border-4 border-yellow-500 shadow-xl flex justify-center items-center hover:-skew-y-3'>
          <img src="/assets/images/astronaut_app.webp" alt="Character" width={100} height={75} loading='eager' style={{ position: 'absolute', top: '-4rem', left: '-3rem', zIndex: 10 }} />
          <Link href="/modules" className='text-2xl font-bold text-yellow-600 hover:text-yellow-800 hover:scale-125 dark:text-white dark:hover:text-white'>App</Link>
        </Link>
      <Link href='/team-settings' className='relative w-1/4 h-64 p-5 rounded-2xl border-4 border-yellow-500 shadow-xl flex justify-center items-center hover:skew-y-3'>
          <img src="/assets/images/astronaut_float.webp" alt="Character" width={90} height={75} loading='eager' style={{ position: 'absolute', bottom: '-9rem', left: '8rem', zIndex: 10 }} />
          <Link href="/team-settings" className='text-2xl font-bold text-yellow-600 hover:text-yellow-800 hover:scale-125 dark:text-white dark:hover:text-white'>Team Settings</Link>
      </Link>
      <Link href='/my-clients' className='relative w-1/4 h-64 p-5 rounded-2xl border-4 border-yellow-500 shadow-xl flex justify-center items-center hover:skew-y-3'>
          <img src="/assets/images/astronaut_settings.webp" alt="Character" width={100} height={75} loading='eager' style={{ position: 'absolute', top: '2rem', right: '-5rem', zIndex: 10 }} />
          <Link href="/my-clients" className='text-2xl font-bold text-yellow-600 hover:text-yellow-800 hover:scale-125 dark:text-white dark:hover:text-white'>My Clients</Link>
      </Link>
    </div>
  </main>
  )
}

export default Dashboard;
