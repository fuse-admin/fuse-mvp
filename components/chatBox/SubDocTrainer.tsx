import { useEffect, useState } from "react"
import { Archivo } from "next/font/google"
import PDFViewer from '../shared/PDFViewer'

const archivo = Archivo({ subsets: ["latin"] })

type SubDocTrainerProps = {
  fileUrl: string,
  trainingFileUrl: string
}

async function processUploadedSubDoc(fileUrl: string) {
  try {
    const respone = await fetch('/api/processSubDoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({fileUrl}),
      });

      if (!respone.ok) {
        throw new Error('Failed to process subdoc');
      }

      const processedSubDocBlob = await respone.blob();
      return URL.createObjectURL(processedSubDocBlob);
    } catch (error) {
      console.error('Error processing subdoc', error);
      throw error;
    }
  }

const SubDocTrainer = ({fileUrl, trainingFileUrl}: SubDocTrainerProps) => {
  const [processedSubDocUrl, setProcessedSubDocUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (fileUrl) {
      setIsProcessing(true);
      processUploadedSubDoc(fileUrl)
        .then(setProcessedSubDocUrl)
        .finally(() => setIsProcessing(false));
    }
  }, [fileUrl]);

  return (
    <main className='flex flex-row gap-3 w-full h-full'>
        <section className='w-1/2 flex-grow rounded-lg p-4 flex flex-col gap-3' title='Sub-doc viewer'>
          <h1 className={`${archivo.className} text-2xl text-yellow-500 font-extrabold text-center`}>Subscription Document</h1>
          {isProcessing && <p className='animate-ping text-center'>Processing subdoc...</p>}
          <div className='flex-grow shadow-lg rounded-2xl'>
            <PDFViewer fileUrl={fileUrl} />
          </div>
        </section>
        <section className='w-1/2 h-96 rounded-lg p-4 flex flex-col gap-3' title='Field-name dict creator'>
          <h1 className={`${archivo.className} text-2xl text-yellow-500 font-extrabold text-center`}>Field Name Selector</h1>
        </section>
    </main>
  )
}

export default SubDocTrainer