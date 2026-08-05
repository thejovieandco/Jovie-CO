import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkEnabled, clerkPublishableKey } from "./lib/clerk";

// Auth is only needed where a signed-in user is read: the account page and
// the orders API. Keeping the storefront out of the matcher means a problem
// with Clerk can never take down browsing or checkout.

const passThrough = () => NextResponse.next();

function guardedClerk() {
  let handler;
  try {
    handler = clerkMiddleware({ publishableKey: clerkPublishableKey });
  } catch (err) {
    console.error("Clerk middleware failed to initialise:", err);
    return passThrough;
  }
  return async function middleware(request, event) {
    try {
      return await handler(request, event);
    } catch (err) {
      // Degrade to signed-out rather than erroring the request
      console.error("Clerk middleware error:", err);
      return NextResponse.next();
    }
  };
}

export default clerkEnabled ? guardedClerk() : passThrough;

export const config = {
  matcher: ["/account/:path*", "/api/orders/:path*"],
};
