import { useEffect, useState } from 'react'
import { Archivo } from 'next/font/google'
import PDFViewer from '../shared/PDFViewer'
import FieldNameSelector from './FieldNameSelector'
import { PDFDocument } from 'pdf-lib'
import { Input } from '../ui/input'

const archivo = Archivo({ subsets: ["latin"] })

type SubDocTrainerProps = {
  fileUrl: string,
  onSubmit: (selectedData: Record<string, string | null>) => void;
}

async function processUploadedSubDoc(fileUrl: string) {
  try {
    // This API call should now return the modified PDF data (Uint8Array)
    const response = await fetch('/api/processSubDoc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to process subdoc');
    }

    // Assuming the API is modified to return the PDF data as a blob
    const modifiedPdfBytes = await response.arrayBuffer(); // Get the arrayBuffer from the response
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    // Extract the field names from the modified PDF
    const pdfDoc = await PDFDocument.load(modifiedPdfBytes);
    const form = pdfDoc.getForm();
    const fieldNames = form.getFields().map(field => field.getName()).sort((a,b) => a.localeCompare(b));

    return {blobUrl, fieldNames}; // This is the Blob URL
  } catch (error) {
    console.error('Error processing subdoc', error);
    throw error;
  }
}


const SubDocTrainer = ({fileUrl, onSubmit}: SubDocTrainerProps) => {
  const [processedSubDocUrl, setProcessedSubDocUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fieldNames, setFieldNames] = useState<string[]>([]);

  useEffect(() => {
    if (fileUrl) {
      setIsProcessing(true);
      processUploadedSubDoc(fileUrl)
        .then(data => {
          setProcessedSubDocUrl(data.blobUrl);
          setFieldNames(data.fieldNames);
        })
        .finally(() => setIsProcessing(false));
    }
  }, [fileUrl]);


  return (
    <main className='grid grid-cols-2 w-full h-full gap-3'>
        <section className='w-full flex flex-col gap-3' title='Sub-doc viewer'>
          <h1 className={`${archivo.className} text-2xl text-yellow-500 font-extrabold text-center`}>Document</h1>
          <div className='mb-4'>
            {processedSubDocUrl ? <PDFViewer fileUrl={processedSubDocUrl} /> : <p>Loading PDF...</p>}
          </div>
        </section>
        <section className='w-full flex flex-col gap-3' title='Field-name dict creator'>
          <h1 className={`${archivo.className} text-2xl text-yellow-500 font-extrabold text-center`}>Field Name Selector</h1>
          <FieldNameSelector fieldNames = {fieldNames} onSubmit={onSubmit} />
        </section>
    </main>
  )
}

export default SubDocTrainer