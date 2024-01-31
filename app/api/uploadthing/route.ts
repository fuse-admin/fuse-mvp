import { createRouteHandler } from "uploadthing/next";
import { subDocFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
    router: subDocFileRouter,
});