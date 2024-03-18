import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    '/',
    '/about',
    '/contact',
    '/demo',
    '/policy',
    '/solutions',
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/uploadthing',
    '/api/submitTrainingData',
    '/api/chat',
    '/api/fillW9',
    '/api/firm-clients',
    '/api/fillDemoSubDoc',
    '/api/send',
  ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 