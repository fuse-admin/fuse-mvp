import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { auth } from '@clerk/nextjs'


// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});