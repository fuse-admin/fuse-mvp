"use client";
import React, { useState } from "react"
import AiChatBox from '@/components/chatBox/AiChatBox';
import InstructionBox from '@/components/chatBox/InstructionBox';
import { NewDocModal } from '@/components/chatBox/NewDocModal';
import Loading from "@/components/shared/Loading";

const Module = () => {
  const [selectedTab, setSelectedTab] = useState('document-filler');
  const [isLoading] = useState(false);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);

  const openNewDocModal = () => setIsNewDocModalOpen(true);
  const closeNewDocModal = () => setIsNewDocModalOpen(false);

  return (
      <main className='grid grid-cols-1 md:grid-cols-2 h-screen'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
        {/* ChatBox Section */}
        <section>
          <div className="w-full h-screen ml-14">
          <InstructionBox
            selectedTab={selectedTab}
            openNewDocModal={openNewDocModal}

          />
          </div>
        </section>
        <section className='w-screen h-screen'>
          <div className="w-full"> 
            <AiChatBox
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
        </section>
        </>
        )}
        {/* NewDocModal */}
        <NewDocModal isOpen={isNewDocModalOpen} onClose={closeNewDocModal}> 
        </NewDocModal>
      </main>
  )
}

export default Module;
