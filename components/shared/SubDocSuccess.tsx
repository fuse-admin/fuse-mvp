import Image from 'next/image'
import React from 'react'
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ["latin"] })

const SubDocSuccess = () => {
  return (
    <main className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-3 justify-center items-center mt-10'>
            <h1 className={`${archivo.className} text-center text-green-500 text-3xl font-bold`}>Success!</h1>
            <p className='text-center'>Your document has been successfully trained</p>
        </div>
        <div className='flex justify-center items-center mt-10'>
            <Image
              src='/assets/images/party.svg' 
              alt='Success'
              priority={true}
              width={500} 
              height={300}>
            </Image>
        </div>
    </main>
  )
}

export default SubDocSuccess