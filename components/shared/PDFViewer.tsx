import React, { useState } from 'react'
import Loading from './Loading'

type PDFViewerProps = {
  fileUrl: string
}

const PDFViewer = ({fileUrl}: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true)

  if (!fileUrl) {
    setIsLoading(false)
  };
  
  return (
    <main className='w-full h-full'>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <Loading />
        </div>
      ):(
        <iframe 
          src={fileUrl}
          style={{ width: '100%', height: '100%' }}
          title='PDF Viewer'
          />
      )}
    </main>
  )
}

export default PDFViewer