import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/database";
import trainingdataModel from "@/lib/database/models/trainingdata.model";

export async function POST(req: NextRequest) {
    if (req.method !== "POST") {
        return new Response(null, { status: 405 });
    }
    try {
        // Connect to the database
        await connectToDatabase();

        // Extract the data from the request body
        const body = await req.json();
        const { fundName, fileUrl, orgId, ...dynamicfields } = body;

        // Create a new training data document
        const newtrainingData = new trainingdataModel({
            fundName,
            fileUrl,
            orgId,
            dynamicfields
        });

        // Save the training data document
        await newtrainingData.save();

        // Return a success response
        return new Response(JSON.stringify({ message: "Training data submitted successfully" }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (error) {
        console.error("Failed to submit the training data", error);
        return new Response(JSON.stringify({ message: "Failed to submit the training data" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
}