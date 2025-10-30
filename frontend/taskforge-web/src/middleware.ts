export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/:path*",
    "/leads/:path*",
    "/assistant/:path*",
    "/find-lead/:path*",
    "/payments/:path*",
    "/settings/:path*",
  ],
};
