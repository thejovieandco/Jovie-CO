import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk only activates once its keys exist in the environment.
// Without them the middleware is a no-op and the site runs as before.
const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default clerkEnabled ? clerkMiddleware() : function middleware() {};

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|.*\\.(?:jpg|jpeg|png|webp|gif|svg|ico|css|js|woff2?)).*)",
    "/(api|trpc)(.*)",
  ],
};
