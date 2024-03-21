import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import TrainingData from "@/lib/database/models/trainingdata.model";
import { OpenAI } from "openai";

type DynamicFields = {
    [key: string]: string;
}

type TrainingData = {
    fundName: string;
    fileUrl: string;
    orgId: string;
    dynamicFields: DynamicFields;
}

export async function POST(req: NextRequest){
    if(req.method !== "POST"){
        return new NextResponse("Invalid request method", {status: 405});
    }
    
    // Get the body of the request
    const body = await req.json();
    const fundNameInput = body.fundName;
    const orgId = body.orgId;

    // Connect to the database
    await connectToDatabase();
    // Fetch all fund names
    const funds = await TrainingData.find().select('fundName -_id').lean();
    const fundNames = funds.map(fund => fund.fundName);
    console.log("Funds available in database: ", fundNames);


    // Use OpenAI to find the best match
    const openai = new OpenAI();
    const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant for advisors. Given a fund name, you find the best match from a list of funds. Please only return the full name from the list. Return 'No match found' if there is no match."
            },
            {
                role: "user",
                content: `Find the closest match to ${fundNameInput} from this list of funds: ${fundNames.join(", ")}. Please only return the fund name nothing else!`
            }
        ]
    });
    const bestDBMatch = gptResponse.choices[0].message.content;
    console.log("Best match found: ", bestDBMatch);
    if(bestDBMatch === "No match found"){
        return new NextResponse("No match found for fund.", {status: 404});
    }

    // Fetch the document mapping from the database
    const trainingData: TrainingData | null = await TrainingData.findOne({fundName: bestDBMatch}).lean();
    console.log("Document mapping found: ", trainingData);

    //Check if user is authorized to access the document mapping
    if(trainingData?.orgId !== orgId){
        return new NextResponse("Unauthorized", {status: 403});
    }

    // Return the document mapping
    return NextResponse.json(trainingData);
}