"use client"
import Typed from 'typed.js';
import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { Archivo } from "next/font/google"
import { Button } from '@/components/ui/button';

const archivo = Archivo({ subsets: ["latin"] })

export default function Home() {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<Typed | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const options = {
      strings: [
        'The future of alts operations is now',
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
    transition: 'opacity 0s ease-in-out',
    opacity: imageLoaded ? 1 : 0, // Start at 0 opacity, transition to 1 when image is loaded
  };

  return (
    <main className="flex flex-col overflow-auto md:overflow-hidden">
      {/* Hero section */}
      <section className="flex flex-col md:flex-row items-center justify-center" id="hero" style={{ height: '100vh' }}>
        {/* Text container with a fixed height to prevent layout shift */}
        <div className='w-full md:w-1/2 md:px-12 text-center md:text-left sm: mb-0 sm: mt-10'>
          <div className='text-6xl mt-10 mb-0 p-4 text-yellow-500 font-bold md:text-8xl' style={{ height: '200px' }}>
            <span 
            className={archivo.className} 
            ref={el} />
          </div>
          <div className='mt-5'>
            <Button 
              className="ml-5 mt-20 hover:scale-150 hover:bg-emerald-500 hover:ease-in-out duration-300" variant="outline">
              <a href='/demo'>
                Learn More
              </a>
            </Button>
          </div>
        </div>
        {/* Image container */}
        <div className='w-full md:w-1/2 flex md:justify-end px-0 md:px-12' style={fadeInStyle}>
          <Image
            src="/assets/images/future.svg"
            width={1024}
            height={1024}
            alt="Future"
            className='dark:hue-rotate-180'
            loading='eager'
            onLoad={() => setImageLoaded(true)}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
      </section>
      {/* Features section 
      <section className="h-screen relative flex flex-col p-3 gap-3">
        <h1 className={`${archivo.className} text-4xl p-2 text-yellow-500`}>The current alternatives operations process is plagued with issues...</h1>
        <ul className='w-full items-center justify-between flex flex-col p-3 gap-5 md:flex-row'>
          <li>
            <h1 className={`${archivo.className} text-4xl p-2 text-yellow-500 font-semibold`}>Manual Paperwork</h1>
            <Image
              src="/assets/images/paper.svg"
              width={350}
              height={350}
              loading='eager'
              className='self-center dark:hue-rotate-180'
              alt='Manual Paperwork'/>
              
          </li>
          <li>
            <h1 className={`${archivo.className} text-4xl p-2 text-yellow-500 font-semibold`}>Endless Portals</h1>
            <Image
              src="/assets/images/portals.svg"
              width={350}
              height={350}
              loading='eager'
              className='dark:hue-rotate-180'
              alt='Endless Portals'/>
              
          </li>
          <li>
            <h1 className={`${archivo.className} text-4xl p-2 text-yellow-500 font-semibold`}>Archaic Systems</h1>
            <Image
              src="/assets/images/archaic.svg"
              width={350}
              height={350}
              loading='eager'
              className='self-center dark:hue-rotate-180'
              alt='Archaic Systems'/>
              
          </li>
        </ul>
        <Button className="w-auto relative self-center p-3 border-2 border-yellow-500 md:text-2xl hover:bg-yellow-500 hover:text-white sm: mb-10" variant="outline">
          <a href='/solutions'>
            Find Out How We're Solving These Issues
          </a>
        </Button>
      </section>
      */}
    </main>
  );
}
