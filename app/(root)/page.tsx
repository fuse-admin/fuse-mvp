"use client"
import Typed from 'typed.js';
import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { Archivo } from "next/font/google"
import { Button } from '@/components/ui/button';
import { Organization } from '@clerk/nextjs/server';
import { OrganizationSwitcher } from '@clerk/nextjs';

const archivo = Archivo({ subsets: ["latin"] })

export default function Home() {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<Typed | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const options = {
      strings: [
        'Future of alts operations is now',
        'Take back your time',
        'Connect your processes with Fuse', 
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    };

    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  // Inline style for the fade-in effect
  const fadeInStyle = {
    transition: 'opacity 0.5s ease-in-out',
    opacity: imageLoaded ? 1 : 0, // Start at 0 opacity, transition to 1 when image is loaded
  };

  return (
    <main className="flex flex-col overflow-hidden">
      {/* Hero section */}
      <section 
        className="flex flex-row items-center justify-center mt-0" 
        style={{ height: '80vh' }}>
        {/* Text container with a fixed height to prevent layout shift */}
        <div className='w-full text-left mt-0 mb-0'>
          <div className='text-5xl p-4 text-yellow-500 font-bold flex justify-start items-left' style={{ height: '200px' }}>
            <span 
            className={archivo.className} 
            ref={el} />
          </div>
          <div>
            <Button 
              className="ml-5 hover:scale-125 hover:bg-yellow-500/100 hover:ease-in-out duration-300" variant="outline">
              <a href='/demo'>
                Learn More
              </a>
            </Button>
          </div>
        </div>
        {/* Image container */}
        <div className='' style={fadeInStyle}>
          <Image
            src="/assets/images/future.webp"
            width={1024}
            height={1024}
            alt="Future"
            loading='eager'
            onLoad={() => setImageLoaded(true)}/>
        </div>
      </section>
    </main>
  );
}
