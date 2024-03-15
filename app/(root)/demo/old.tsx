"use client";
import React, { useState, useEffect } from "react"
import DemoChatBox from "@/components/demo/DemoChatBox";
import DemoInstructionBox from "@/components/demo/DemoInstructionBox";
import { Archivo } from 'next/font/google'
import Modal from "@/components/shared/Modal";
import Image from "next/image";

const archivo = Archivo({ subsets: ["latin"] })

const Demo = () => {
  const [selectedTab, setSelectedTab] = useState('document-filler');
  const [isLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <main className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      <section className='w-screen h-screen ml-5'>
        <div className="w-full"> 
          <DemoChatBox
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </section>
      <section>
        <div className="w-full">
        <DemoInstructionBox
          selectedTab={selectedTab}
        />
        </div>
      </section>
        {/* Welcome Modal */}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <main className="flex-cols gap-3 p-3">
              <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl text-center mb-5`}>Welcome to Fuse!</h1>
              <section>
                <h3 className="text-xl justify-start font-bold mb-3">What is Fuse?</h3>
                <p className='flex text-justify mb-3'>
                  Fuse simplifies the alternative investment workflow. 
                  We offer a number of tools to assist the manual process:</p>
                  <ul className="grid grid-cols-2 gap-5">
                    <li className="flex-rows gap-0">
                      <div className="flex flex-cols justify-between">
                        <h3 className="text-xl mt-10 mb-0">Document Filler</h3>
                        <Image
                          src = "/assets/images/doc_filler.webp"
                          height={1024}
                          width={1024}
                          className="h-20 w-20 rounded-xl group-hover:shadow-xl flex justify-items-end"
                          alt="Document-filler"/>
                      </div>
                      <p className=" text-left">Fill in alternative investment documents in seconds</p>
                    </li>
                    <li className="gap-3">
                      <Image
                        src = "/assets/images/doc_query.webp"
                        height={1024}
                        width={1024}
                        className="h-20 w-20 rounded-xl group-hover:shadow-xl mb-3 text-center"
                        alt="Document-query"/>
                      <span className="font-bold">Document Query: </span>Query and extract data from any alternative investment document
                    </li>
                    <li className="gap-3">
                      <Image
                        src = "/assets/images/custom_reports.webp"
                        height={1024}
                        width={1024}
                        className="h-20 w-20 rounded-xl group-hover:shadow-xl mb-3 text-center"
                        alt="Custom-reports"/>
                      <span className="font-bold">Custom Reports: </span>Generate custom reports on your alternative investment data in seconds
                    </li>
                    <li className="gap-3">
                      <Image
                        src = "/assets/images/general_knowledge.webp"
                        height={1024}
                        width={1024}
                        className="h-20 w-20 rounded-xl group-hover:shadow-xl mb-3 text-center"
                        alt="General-knlowedge"/>
                      <span className="font-bold">General Knowledge: </span>Ask Fuse any question about alternative investments to fill knowledge gaps
                    </li>
                  </ul>
              </section>
            </main>
          </Modal>
        )}
    </main>
  )
}

export default Demo;
