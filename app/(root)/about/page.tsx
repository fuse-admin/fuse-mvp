"use client";
import { Archivo } from 'next/font/google'
import React, {useState, useEffect} from 'react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import Image from 'next/image'
import Modal from "@/components/shared/Modal";

const archivo = Archivo({ subsets: ["latin"] })

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);

  const openModal = (teamMember: string) => {
    setSelectedTeamMember(teamMember);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

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
                  onClick={() => openModal('Kwabena')}
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
                  onClick={() => openModal('Bobby')}
                >
                  Read More
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </section>
     {/* Team Modal */}
     {isModalOpen && (
        <Modal
          onClose={closeModal}>
          <main>
            {selectedTeamMember === 'Kwabena' && (
              <div className='flex flex-col justify-start p-2'>
                {/* Kwabena's information */}
                <h2 className={`${archivo.className} text-3xl font-bold`}>Kwabena Andoh-Baidoo</h2>
                <p className='font-semibold'>CEO, Co-Founder</p>
                <p className='font-semibold text-justify mt-3'>Kwabena has over 5 years of experience in the RIA industry. 
                He has a wealth of experience in client reporting and alternative investment data management. 
                Over the last 4 years, a big focus of his work has revolved around streamlining alternative investment data management: 
                optimizing investment procedures and portfolio administration while managing an internship program.</p>
                <p className='font-semibold text-justify mt-3'>At his previous job, Kwabena used a suite of tools to develop a program that
                translated alternative investment data from statements into the company's portfolio accounting system.</p>
                <p className='font-semibold text-justify mt-3'>Kwabena graduated from Duke University with a Bachelor of Arts in Psychology & Neuroscience. 
                His studies concentrated on exploring the various factors that influence personalities and behaviors. 
                He believes in the interconnectedness of ideas, environments, and disciplines.</p>
                <p className='font-semibold text-justify mt-3'>After immigrating from Ghana to Canada, and then to the United States, 
                Kwabena now works from his home in Austin, TX to build financial literacy and entrepreneurship programs in Ghanaian schools and communities. 
                In his free time, he enjoys watching his favorite team, Chelsea FC, cooking, writing, and playing a riveting game of Settlers of Catan.</p>
              </div>
            )}
            {selectedTeamMember === 'Bobby' && (
                <div className='flex flex-col justify-start p-2'>
                {/* Kwabena's information */}
                <h2 className={`${archivo.className} text-3xl font-bold`}>Mark 'Bobby' Johnson</h2>
                <p className='font-semibold'>COO, Co-Founder</p>
                <p className='font-semibold text-justify mt-3'>Bobby has been an integral part of many operations teams, 
                delivering outstanding service in various areas such as investment reporting, account services, tax document servicing, 
                investment transactions, and asset transfers. Bobby also holds a Series 65 License and has assisted in servicing Insurance Dedicated Funds while leveraging 
                his extensive experience and knowledge in the implementation of alternative investments.</p>
                <p className='font-semibold text-justify mt-3'>Bobby, a former D1 college baseball player, graduated from Southern University and A&M College. 
                As the starting catcher, he led his team to a conference championship. 
                During his time at Southern, Bobby showcased his skills and leadership by participating in the 2019 NCAA 
                regionals at Mississippi State.</p>
                <p className='font-semibold text-justify mt-3'>In his free time, Bobby enjoys exploring the Austin music scene and is a huge Bob Dylan fan. 
                He is always ready for a friendly debate on philosophy, politics, or anything else. 
                He is a fun-loving and outgoing person who brings a positive energy to our team.</p>
              </div>
            )}
          </main>
        </Modal>
      )}
    </main>
  )
}

export default AboutUs