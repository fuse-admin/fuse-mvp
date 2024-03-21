import { PDFDocument, PDFTextField } from 'pdf-lib';
import fetch from 'node-fetch';

export async function fillSubDoc(pdfUrl: string, docFillData: any){
    // Fetch the PDF
    const response = await fetch(pdfUrl);
    //Check if the response was ok and the content type is a PDF
    if (!response.ok || response.headers.get('Content-Type') !== 'application/pdf') {
        throw new Error(`Could not fetch the PDF. Status:${response.status}`);
    }
    const pdfBytes = await response.arrayBuffer();
    console.log('First few lines of PDF: ',new TextDecoder().decode(pdfBytes.slice(0, 5))); // Should log '%PDF-'
    const pdfDoc = await PDFDocument.load(pdfBytes);

    console.log('PDF loaded successfully');

    // Get the form containing all the fields
    const form = pdfDoc.getForm();

    // Fill the fields
    Object.entries(docFillData).forEach(([pdfFieldName, docFillDataField]) => {
        const field = form.getField(pdfFieldName);
        if (field instanceof PDFTextField) {
            const value = docFillData[pdfFieldName] || '';
            field.setText(value);
        }
        if (!field) {
            console.log(`Field ${pdfFieldName} not found in the PDF`);
        }
    });

    // Serialize the PDFDocument to bytes
    const filledPdfBytes = await pdfDoc.save();
    return filledPdfBytes;
}