"use client";
import React, { useState } from "react"
import DemoChatBox from "@/components/demo/DemoChatBox";
import DemoInstructionBox from "@/components/demo/DemoInstructionBox";
import Loading from "@/components/shared/Loading";

const Demo = () => {
  const [selectedTab, setSelectedTab] = useState('document-filler');
  const [isLoading] = useState(false);

  return (
      <main className='grid grid-cols-1 md:grid-cols-2 h-screen'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
        {/* ChatBox Section */}
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
        </>
        )}
        {/* Training Modal */}
      </main>
  )
}

export default Demo;
