// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Public routes are allowed through.
 * Protected routes require a valid NextAuth token (JWT).
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public assets & auth routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Only guard these app routes
  const needsAuth =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/jobs") ||
    pathname.startsWith("/leads") ||
    pathname.startsWith("/find-lead");

  if (!needsAuth) {
    return NextResponse.next();
  }

  // Check NextAuth JWT (must have NEXTAUTH_SECRET set)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Limit the middleware to relevant paths (perf)
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/:path*",
    "/leads/:path*",
    "/find-lead/:path*",
    "/login",
    "/api/auth/:path*",
  ],
};