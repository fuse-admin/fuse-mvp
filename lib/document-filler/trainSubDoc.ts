import { PDFDocument } from 'pdf-lib';

export async function trainSubDoc(fileUrl: string) {
    try {
        console.log(`Starting to load the PDF from URL: ${fileUrl}`);

        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`Failed to fetch the PDF from URL: ${fileUrl}`);
        const pdfBlob = await response.blob();

        //Convert the blob to ArrayBuffer
        const arrayBuffer = await pdfBlob.arrayBuffer();

        const pdfDoc = await PDFDocument.load(arrayBuffer);
        console.log(`PDF loaded successfully`);

        const form = pdfDoc.getForm();
        const fields = form.getFields();
        fields.forEach(field => {
            console.log(`Field found with name: ${field.getName()}`);
        });

        // Assuming w9Mapping and clientData are defined and available
        // If not, you need to define them or adjust the logic accordingly
        /*
        Object.entries(w9Mapping).forEach(([pdfFieldName, clientDataField]) => {
            try {
                const field = form.getField(pdfFieldName);
                if (field instanceof PDFTextField) {
                    const value = clientData[clientDataField] || '';
                    field.setText(value);
                }
            } catch (error) {
                console.error(`Error processing field ${pdfFieldName}:`, error);
            }
        });
        */

        console.log(`Starting to save the modified PDF`);
        const pdfBytes = await pdfDoc.save();
        console.log(`Modified PDF saved successfully`);

        return pdfBytes;
    } catch (error) {
        console.error(`Error in trainSubDoc with URL ${fileUrl}:`, error);
        throw new Error(`Failed to load PDF: ${error}`) // Rethrow the error after logging it
    }
}
