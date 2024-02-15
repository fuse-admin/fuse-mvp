import { PDFDocument, PDFTextField } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import w9Mapping from './mappings/w9_mapping.json';

export async function fillW9(clientData: any) {
    // Load the W-9 PDF
    const pdfPath = path.join(process.cwd(), '/global-documents/fw9.pdf');
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the form containing all the fields
    const form = pdfDoc.getForm();

    {/*// Log all field names
    const fields = form.getFields();
    fields.forEach(field => {
        console.log(field.getName());
    }); */}

    // Fill the fields
    Object.entries(w9Mapping).forEach(([pdfFieldName, clientDataField]) => {
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
