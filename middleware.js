// middleware.js

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes that start with `/admin`
  if (isAdminRoute(req)) {
    // Retrieve the session claims, including publicMetadata
    const { sessionClaims } = await auth();

    // Check if the user has the `admin` role in publicMetadata
    const role = sessionClaims?.metadata?.role;
    if (role !== 'admin') {
      console.log('User is not an admin, redirecting to home.');
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
  }

  // Allow the request to proceed if the user is an admin or if the route is not protected
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
