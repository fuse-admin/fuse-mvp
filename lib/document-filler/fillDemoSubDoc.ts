import { PDFDocument, PDFTextField } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import ironwoodMapping from './mappings/ironwood_mapping.json';

export async function fillDemoSubDoc(clientData: any) {
    // Load the Ironwood PDF
    const pdfPath = path.resolve(process.cwd(), 'public', 'global-documents', 'ironwood.pdf');
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the form containing all the fields
    const form = pdfDoc.getForm();

    // Fill the fields
    Object.entries(ironwoodMapping).forEach(([pdfFieldName, clientDataField]) => {
        const field = form.getField(pdfFieldName); // Use getField instead of getTextField
        if (field instanceof PDFTextField) { // Check if the field is a text field
            const value = clientData[clientDataField] || ''; // Fallback to empty string if the field is not provided
            field.setText(value);
        }
    });

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
