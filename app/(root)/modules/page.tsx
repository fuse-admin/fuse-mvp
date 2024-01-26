"use client";
import React, { useState } from 'react';
import AiChatBox from '@/components/chatBox/AiChatBox';
import InstructionBox from '@/components/chatBox/InstructionBox';

const Module = () => {
  const [selectedTab, setSelectedTab] = useState('document-filler');

  return (
      <main className='flex flex-col lg:flex-row md:flex-row w-screen h-screen p-3'>
        {/* Center AiChatBox within this section */}
        <section className='w-1/2 flex justify-center items-center'>
          <div className="w-full max-w-sm"> {/* Adjust max-width as needed */}
            <AiChatBox
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
        </section>
        <section className='w-1/2 h-screen'>
          <InstructionBox
            selectedTab={selectedTab}
          />
        </section>
      </main>
  )
}

export default Module;
