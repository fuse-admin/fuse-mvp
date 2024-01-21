"use client";
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Archivo } from 'next/font/google'

const archivo = Archivo({ subsets: ["latin"] })

const NavItems = () => {
    const pathname = usePathname();
    return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
        {headerLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
                <li
                    key={link.route}
                    className={`${archivo.className} ${
                        isActive && 'text-yellow-500 font-bold'}
                        flex-center p-medium-16 whitespace-nowrap`}
                >
                    <Link href={link.route}>{link.label}</Link>
                </li>
            )
        })}
    </ul>
    )
}

export default NavItems