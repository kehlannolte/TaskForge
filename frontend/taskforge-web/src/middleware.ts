import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Auth middleware:
 * - Lets public routes through (login, Next internal, assets, NextAuth API)
 * - Requires auth for: /dashboard, /jobs, /leads, /find-lead
 * - Redirects unauthenticated users to /login?callbackUrl=...
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public paths that do NOT require auth
  const publicPrefixes = [
    "/login",
    "/api/auth",      // next-auth routes
    "/_next",         // next.js internals
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/public",        // static
  ];
  if (publicPrefixes.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Routes that DO require auth
  const protectedRe = /^(\/dashboard|\/jobs|\/leads|\/find-lead)(\/.*)?$/;
  const needsAuth = protectedRe.test(pathname);
  if (!needsAuth) {
    return NextResponse.next();
  }

  // Check session (JWT) using NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Optional: limit middleware to these paths (saves perf)
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/:path*",
    "/leads/:path*",
    "/find-lead/:path*",
    "/login",
    "/api/auth/:path*", // allow auth callbacks to pass the middleware
  ],
};
