import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import FooterItems from './FooterItems'

const Footer = () => {
  return (
    <footer className='border-t border-yellow-500'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href='/'>
          <Image
            src='/assets/images/fuse_logo.svg'
            alt='Fuse AI Logo'
            width={128}
            height={38}
          />
        </Link>
        <FooterItems />

        <p>2024 Fuse AI. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer