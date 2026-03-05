import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";



// Define which routes are public (Landing page, etc.)
const isPublicRoute = createRouteMatcher(['/', '/landing(.*)']);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect(); // Protects everything else (dashboard, create, viva)
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};