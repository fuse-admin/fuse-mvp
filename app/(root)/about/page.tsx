import { Archivo } from 'next/font/google'
import React from 'react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import Image from 'next/image'

const archivo = Archivo({ subsets: ["latin"] })

const AboutUs = () => {
  return (
    <main className='h-screen w-screen flex flex-col p-10 mb-10'>
      <section>
        <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl`}>About Us</h1>
      </section>
      <section className='flex flex-rows gap-3'>
        <div className='flex flex-col justify-start gap-3 mt-3'>
          <h2 className='text-xl font-bold font-style: italic'>Empowering Investment Advisors Through Technology</h2>
          <p className='flex text-justify'>Fuse AI, based in Austin, Texas, was founded in 2023 by Kwabena Andoh-Baidoo and Bobby Johnson. 
          We saw a big problem in how Registered Investment Advisors(RIAs) handled their alternative investment workload: too much manual work with documents and data. 
          So, we built a solution that uses AI to automate these tasks, letting advisors focus on their clients and growth.
          </p>
        </div>
        
      </section>
      <section className='mt-10'>
        <h2 className='text-xl font-bold font-style: italic'>Our Team</h2>
        <div className='flex flex-cols gap-10 mb-10'>
          <CardContainer className="inter-var max-w-sm">
            <CardBody className="bg-yellow-500 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className={`${archivo.className} text-xl font-bold text-black dark:text-white`}
              >
                Kwabena Andoh-Baidoo
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className=" text-neutral-800 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                CEO, Co-Founder
              </CardItem>
              <CardItem
                translateZ="100"
                rotateX={20}
                rotateZ={5}
                className="w-full mt-4"
              >
                <Image
                  src = "/assets/images/kwabs.webp"
                  height={1024}
                  width={1024}
                  className="max-h-60 w-full object-cover rounded-xl group-hover:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  translateX={40}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Read More
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var max-w-sm">
            <CardBody className="bg-yellow-500 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className={`${archivo.className} text-xl font-bold text-black dark:text-white`}
              >
                Mark Johnson
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className=" text-neutral-800 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                CCO, Co-Founder
              </CardItem>
              <CardItem
                translateZ="100"
                rotateX={20}
                rotateZ={5}
                className="w-full mt-4"
              >
                <Image
                  src = "/assets/images/bobby.webp"
                  height={1024}
                  width={1024}
                  className="max-h-60 w-full object-cover rounded-xl group-hover:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  translateX={40}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Read More
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          
        </div>
      </section>
        


    </main>
  )
}

export default AboutUs