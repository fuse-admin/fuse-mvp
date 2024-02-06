import React, { useState } from "react";


type PDFViewerProps = {
  fileUrl: string
}

const PDFViewer = ({fileUrl}: PDFViewerProps) => {
  return (
    <main className='w-full h-full'>
        <iframe 
          src={fileUrl}
          style={{ width: '100%', height: '100%' }}
          title='PDF Viewer'
          />
    </main>
  )
}

export default PDFViewer