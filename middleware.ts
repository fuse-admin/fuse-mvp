import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: [
        "/",
        "/about",
        "/contact",
        "/demo",
        "/policy",
        "/solutions",
    ],
    ignoredRoutes: [
        "/api/webhook/clerk",
        "/api/webhook/stripe",
        "/api/uploadthing",
    ],
        

});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};