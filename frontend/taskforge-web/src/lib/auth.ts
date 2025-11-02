// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // optional: prompt consent to easily switch accounts during dev
      authorization: { params: { prompt: "consent", access_type: "offline", response_type: "code" } },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        token.provider = "google";
        // include a couple of useful fields
        // @ts-ignore
        token.picture = (profile as any)?.picture ?? token.picture;
        // @ts-ignore
        token.name = (profile as any)?.name ?? token.name;
      }
      return token;
    },
    async session({ session, token }) {
      // surface token data into session
      // @ts-ignore
      session.user.image = token.picture ?? session.user.image;
      return session;
    },
  },
};
