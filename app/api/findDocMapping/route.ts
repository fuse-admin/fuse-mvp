import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";


type DynamicFields = {
    [key: string]: string;
}

type TrainingData = {
    fundName: string;
    fileUrl: string;
    orgId: string;
    dynamicFields: DynamicFields;
}

export async function POST(req: NextRequest){}