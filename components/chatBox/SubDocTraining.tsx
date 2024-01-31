"use client";
import React from 'react'
import { UploadButton } from '@/lib/utils/uploadthing';

export default function SubDocTraining() {
    return (
        <main className="flex h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="fileuploader"
          onClientUploadComplete={(res) => {
            const file_url = res
            console.log(file_url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </main>
    )
}