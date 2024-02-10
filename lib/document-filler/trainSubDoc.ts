import { PDFDocument, PDFTextField } from 'pdf-lib';
import { uploadPdfToUploadThing } from './uploadPdfToUploadThing';

export async function trainSubDoc(fileUrl: string) {
    try {
        console.log(`Starting to load the PDF from URL: ${fileUrl}`);
        
        // Fetch the PDF from the URL
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`Failed to fetch the PDF from URL: ${fileUrl}`);
        const pdfBlob = await response.blob();

        //Convert the blob to ArrayBuffer(needed for PDFDocument.load() method)
        const arrayBuffer = await pdfBlob.arrayBuffer();

        // Load the PDF
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        console.log(`PDF loaded successfully`);

        // Get the form and fields
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        fields.forEach(field => {
            //Check if the field is a text field
            if (field instanceof PDFTextField) {
                let textToSet = field.getName();
                // If there's a maxLength, truncate the text to fit within it
                if (field.getMaxLength()){
                    textToSet = textToSet.substring(0, field.getMaxLength());
                }
                field.setText(textToSet);
            }
        });

        const modifiedPdfBytes = await pdfDoc.save();
        console.log(`Modified PDF saved successfully`);
        return modifiedPdfBytes;
    } catch (error) {
        console.error(`Error in trainSubDoc with URL ${fileUrl}:`, error);
        throw new Error(`Failed to load PDF: ${error}`)
    }
}
