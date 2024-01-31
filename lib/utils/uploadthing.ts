import {
    generateUploadButton,
    generateUploadDropzone,
  } from '@uploadthing/react';
  
  import type { subDocFileRouter } from '@/app/api/uploadthing/core';
  
  export const UploadButton = generateUploadButton<subDocFileRouter>();
  export const UploadDropzone = generateUploadDropzone<subDocFileRouter>();