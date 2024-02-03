"use client";
import { footerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Archivo } from 'next/font/google'

const archivo = Archivo({ subsets: ["latin"] })

const FooterItems = () => {
    const pathname = usePathname();
    return (
    <ul className='md:flex-between flex flex-col items-start gap-9 md:flex-row'>
        {footerLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
                <li
                    key={link.route}
                    className={`${archivo.className} ${
                        isActive && 'text-yellow-500 font-bold'}
                        flex-center p-medium-16 whitespace-nowrap hover:scale-150 hover:ease-in-out duration-300`}
                >
                    <Link href={link.route}>{link.label}</Link>
                </li>
            )
        })}
    </ul>
    )
}

export default FooterItems