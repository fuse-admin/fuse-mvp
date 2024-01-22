import React from 'react';
import AiChatBox from '@/components/chatBox/AiChatBox';

const Module = () => {
  return (
      <main className='flex flex-col lg:flex-row md:flex-row w-screen h-screen p-3'>
        <section className='w-1/2'>
          <AiChatBox />
        </section>
        <section className='w-1/2 flex justify-center items-center'>
          Instruction box
        </section>
      </main>
  )
}

export default Module;
