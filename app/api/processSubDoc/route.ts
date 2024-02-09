import { NextRequest, NextResponse } from "next/server";
import { trainSubDoc } from "@/lib/document-filler/trainSubDoc";

export async function POST(req: NextRequest) {
    try {
        if (req.method !== "POST") {
        // If not a POST request, return method not allowed
        return new NextResponse(null, { status: 405 });
        }
    
        const fileUrl = await req.json();
        console.log('Received fileUrl:', fileUrl)
    
        const filledPdfBytes = await trainSubDoc(fileUrl.fileUrl);
    
        // Create a new response with the filled PDF
        const response = new NextResponse(filledPdfBytes);
        response.headers.set("Content-Type", "application/pdf");
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        console.error('Request details:', req);
        return new NextResponse(
        JSON.stringify({ message: "Error in training subdoc", error: error}),
        {
            status: 500,
            headers: {
            "Content-Type": "application/json",
            },
        }
        );
    }
    }
