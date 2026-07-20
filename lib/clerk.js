// Central switch for the accounts system.
// A real Clerk publishable key starts with pk_test_ or pk_live_.
// Anything else (empty, stray quotes, a whole NAME=value paste) keeps
// Clerk dormant so a bad paste can never take the site down.
export const clerkPublishableKey = (
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""
).trim();

export const clerkEnabled = clerkPublishableKey.startsWith("pk_");
