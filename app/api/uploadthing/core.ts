import { createUploadthing, type FileRouter } from "uploadthing/next";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs";
 
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const subDocFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  fileuploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
        const { userId } = auth();
        console.log("userId from clerk:", userId);
        if (!userId) {
            throw new Error("Unauthorized");
        }
        
        //const orgId = req.headers.get("X-Organization-Id");
        //console.log("orgId from header:", orgId);
        return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for orgId:", metadata.userId);
        console.log("file url", file.url);

        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: metadata.userId, fileUrl: file.url};
    }),
};
 
export type subDocFileRouter = typeof subDocFileRouter;