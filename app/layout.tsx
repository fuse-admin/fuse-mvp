
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import './globals.css';

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
      <body className={merriweather.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
