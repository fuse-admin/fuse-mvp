export async function uploadPdfToUploadThing(pdfBytes: BlobPart, fileName: string | undefined) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    //FormData to hold the PDF Blob and any other required data
    const formData = new FormData();
    formData.append('file', blob, fileName);

    //Upload the PDF to uploadThing
    const response = await fetch("/api/uploadthing", {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error(`Failed to upload PDF to uploadThing`);

    const data = await response.json();
    return data.url;
}