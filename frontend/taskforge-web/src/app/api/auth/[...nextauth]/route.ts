cat > src/app/api/auth/[...nextauth]/route.ts <<'TS'
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const u = creds?.username ?? "";
        const p = creds?.password ?? "";
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

        if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
          return { id: "admin-1", name: "TaskForge Admin", email: "admin@taskforge.local" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin";
      return token;
    },
    async session({ session, token }) {
      (session as any).role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
TS
