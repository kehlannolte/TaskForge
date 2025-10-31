import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const u = process.env.CREDENTIALS_USERNAME;
        const p = process.env.CREDENTIALS_PASSWORD;
        if (!u || !p) return null;

        const ok =
          creds?.username?.toString() === u &&
          creds?.password?.toString() === p;

        if (!ok) return null;

        return {
          id: "user-1",
          name: "TaskForge Admin",
          email: "owner@taskforge.local",
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});
