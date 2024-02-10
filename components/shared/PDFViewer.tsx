import React, { useState } from "react";


type PDFViewerProps = {
  fileUrl: string
}

const PDFViewer = ({fileUrl}: PDFViewerProps) => {
  return (
    <main className='w-full h-full border-2 border-yellow-500 shadow-lg rounded-lg'>
        <iframe 
          src={fileUrl}
          style={{ width: '100%', height: '100vh' }}
          title='PDF Viewer'
          />
    </main>
  )
}

export default PDFViewer