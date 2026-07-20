import { clerkMiddleware } from "@clerk/nextjs/server";
import { clerkEnabled, clerkPublishableKey } from "./lib/clerk";

// Clerk only activates once a valid-looking publishable key exists.
// Without one the middleware is a no-op and the site runs as before.
export default clerkEnabled
  ? clerkMiddleware({ publishableKey: clerkPublishableKey })
  : function middleware() {};

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|.*\\.(?:jpg|jpeg|png|webp|gif|svg|ico|css|js|woff2?)).*)",
    "/(api|trpc)(.*)",
  ],
};
