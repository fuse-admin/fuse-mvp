
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import './globals.css';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import "@uploadthing/react/styles.css";

const merriweather = Merriweather({ weight: ['300'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fuse AI',
  description: 'Connect your processes with Fuse!',
  icons: {
    icon: '/assets/images/fuse_logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang='en'>
      <body className={merriweather.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
