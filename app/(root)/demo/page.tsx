"use client";
import React, { useState, useEffect } from "react"
import DemoChatBox from "@/components/demo/DemoChatBox";
import DemoInstructionBox from "@/components/demo/DemoInstructionBox";
import { Archivo } from 'next/font/google'
import Modal from "@/components/shared/Modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      <section className="w-full ml-14">
        <div className="w-full">
        <DemoInstructionBox
          selectedTab={selectedTab}
        />
        </div>
      </section>
      <section className='w-full h-screen'>
        <div className="w-full"> 
          <DemoChatBox
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </section>
        {/* Welcome Modal */}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <main className="flex-col gap-3 p-3">
              <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl text-center mb-5`}>Welcome to Fuse</h1>
              <section>
                <h3 className="text-xl justify-start font-bold mb-3">What is Fuse?</h3>
                <p className='flex text-justify mb-3'>
                  Fuse simplifies the alternative investment workflow. 
                  We offer a number of tools to assist the manual processes:</p>
                  <ul className="grid grid-cols-2 gap-5 mt-7">
                    <li className="flex flex-col justify-center items-center">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div>
                          <h3 className="text-xl mb-0">Document Filler</h3>
                          <p>Fill in alternative investment documents in seconds using data from your CRM</p>
                        </div>
                        <Image
                          src="/assets/images/doc_filler.webp"
                          height={1024}
                          width={1024}
                          className="w-12 h-12"
                          alt="Document-filler"/>
                      </div>
                    </li>
                    <li className="flex flex-col justify-center items-center">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div>
                          <h3 className="text-xl mb-0">Document Query</h3>
                          <p>Query and extract data from any alternative investment document</p>
                        </div>
                        <Image
                          src="/assets/images/doc_query.webp"
                          height={1024}
                          width={1024}
                          className="w-12 h-12"
                          alt="Document-filler"/>
                      </div>
                    </li>
                    <li className="flex flex-col justify-center items-center relative">
                      <div className="absolute top-0 right-12 w-1/3 h-1/3 bg-red-600 bg-opacity-75 flex justify-center items-center rounded-xl">
                        <span className="text-white font-bold">Coming Soon</span>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div>
                          <h3 className="text-xl mb-0">Custom Reports</h3>
                          <p>Generate custom reports based on your alternative investment data</p>
                        </div>
                        <Image
                          src="/assets/images/custom_reports.webp"
                          height={1024}
                          width={1024}
                          className="w-12 h-12"
                          alt="Document-filler"/>
                      </div>
                    </li>
                    <li className="flex flex-col justify-center items-center">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div>
                          <h3 className="text-xl mb-0">General Knowledge</h3>
                          <p>Ask Fuse any question about alternative investments to fill knowledge gaps</p>
                        </div>
                        <Image
                          src="/assets/images/general_knowledge.webp"
                          height={1024}
                          width={1024}
                          className="w-12 h-12"
                          alt="Document-filler"/>
                      </div>
                    </li>
                  </ul>
              </section>
              <section className="flex flex-row mt-10 mb-0 gap-3">
                <p className="flex justify-center items-center">Learn more through the Demo</p>
                <Button
                  className="w-10 bg-green-600"
                  onClick={closeModal}
                >
                  Go
                </Button>

              </section>
            </main>
          </Modal>
        )}
    </main>
  )
}

export default Demo;
