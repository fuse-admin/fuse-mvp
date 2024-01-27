import { NextRequest, NextResponse } from 'next/server';
import { fillW9 } from '@/lib/document-filler/fillW9';

export async function POST(req: NextRequest) {
  try {
    if (req.method !== 'POST') {
      // If not a POST request, return method not allowed
      return new NextResponse(null, { status: 405 });
    }

    const clientData = await req.json(); 

    // Split the SSN into 3 parts
    const ssnpParts = clientData.social_security_number.split('-');
    if (ssnpParts.length !== 3) {
      throw new Error('Invalid SSN format. Expected format: XXX-XX-XXXX');
    }

    // Map the SSN parts to the respective fields
    const formData = {
      ...clientData,
      ssn_first_three: ssnpParts[0],
      ssn_middle_two: ssnpParts[1],
      ssn_last_four: ssnpParts[2]
    };


    const filledPdfBytes = await fillW9(formData);

    // Create a new response with the filled PDF
    const response = new NextResponse(filledPdfBytes);
    response.headers.set('Content-Type', 'application/pdf');
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'Error in filling W-9 form' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
