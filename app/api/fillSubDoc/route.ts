import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { GenericClientData, TrainingData, DynamicFields } from '@/types';
import { fillSubDoc } from '@/lib/document-filler/fillSubDoc'

export async function POST(req: NextRequest) {
try {
    if (req.method !== 'POST') {
        return new NextResponse(null, { status: 405 })
    }
    // Get the body of the request
    const body = await req.json()
    const clientData: GenericClientData = body.clientData
    const trainingData: TrainingData = body.docMappingData
    // Convert clientData and trainingData to strings for GPT
    const clientDataString = Object.entries(clientData)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
    const trainingDataString = Object.entries(trainingData.dynamicfields.dynamicfields)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');


    // Use GPT to match client data and training data => return data to fill subdoc
    const openai = new OpenAI()
    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant for advisors. You match the values of a client data dictionary with the keys of training data dictionary to create a pairing. Returning the pairing as JSON. Just the JSON nothing else.'
            },
            {
                role: 'user',
                content: `Here is the client data ${clientDataString} and here is the training data: ${trainingDataString}. Please give me the appropriate pairing.`
            }
        ]
    });

    let docFillData = gptResponse.choices[0].message.content;
    console.log('Pairing found: ', docFillData);

    if (docFillData) {
        // Remove Markdown code block formatting from GPT resposne if present
        docFillData = docFillData.replace(/```json\n?/, '').replace(/\n?```/, '').trim();

        try {
            // Now, try parsing the cleaned-up string as JSON
            docFillData = JSON.parse(docFillData);
            console.log('docFillData after parsing:', docFillData);
        } catch (error) {
            console.error('Error parsing docFillData:', error);
            // Handle the parsing error appropriately
        }
    }

    // Get url of the pdf to fill
    const pdfUrl = trainingData.fileUrl;

    // Fill the pdf with the client data (create function in the lib->pdfFiller)
    const filledPdf = await fillSubDoc(pdfUrl, docFillData);

    // Return the filled pdf
    const response = new NextResponse(filledPdf)
    response.headers.set('Content-Type', 'application/pdf')
    return response;
} catch (error) {
    console.error(error)
    return new NextResponse(
    JSON.stringify({ message: 'Error in filling subdoc' }),
    {
        status: 500,
        headers: {
        'Content-Type': 'application/json'
        }
    }
    )
}
}