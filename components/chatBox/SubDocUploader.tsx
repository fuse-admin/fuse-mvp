import { useState } from 'react'
import { FileUploader } from '../shared/FileUploader'
import { Archivo } from 'next/font/google';
import Image from 'next/image';

const archivo = Archivo({ subsets: ["latin"] })

type SubDocUploaderProps = {
  onFileUploadComplete: (url: string, name: string) => void;
}

const SubDocUploader = ({ onFileUploadComplete }: SubDocUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const handleUploadComplete = (url: string,name: string) => {
    setFileUrl(url);
    setFileName(name);
    onFileUploadComplete(url, name);
  };

  return (
    <main className='flex flex-col gap-10 items-center justify-center h-full'>
      {fileUrl ? (
      <div className='flex flex-col items-center justify-center'>
        <h1 className={`${archivo.className} text-3xl text-center p-3 font-bold text-yellow-500`}>File Uploaded!</h1>
        <p>Your file,<span className='font-extrabold'>{fileName}</span>, has been loaded. Please click 'Next' to continue</p>
        <Image 
          src="/assets/images/file_uploaded.svg" className='flex items-center justify-center' alt={fileName} width={300} height={200} priority={true} 
        />
      </div>
      ):(
      <div className='flex flex-col gap-5'>
        <h1 className={`${archivo.className} text-4xl text-center p-3 font-bold text-yellow-500`}>Sub-Doc Training</h1>
        <p className='text-center text-lg'>Upload your subscription or custodian document below to get started</p>
        <FileUploader onFileUploadComplete={handleUploadComplete} />
      </div>
      )}
    </main>
  )
}

export default SubDocUploader