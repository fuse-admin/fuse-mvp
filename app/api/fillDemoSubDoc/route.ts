import { NextRequest, NextResponse } from 'next/server';
import { fillDemoSubDoc } from '@/lib/document-filler/fillDemoSubDoc';

export async function POST(req: NextRequest) {
  try {
    if (req.method !== 'POST') {
      // If not a POST request, return method not allowed
      return new NextResponse(null, { status: 405 });
    }

    const clientData = await req.json(); 


    const filledPdfBytes = await fillDemoSubDoc(clientData);

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
