import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// ✅ Hard-coded allowed emails for now (secure and simple)
const ALLOWED_EMAILS = ["noltek76@gmail.com", "team@taskforgepro.app"];

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: { signIn: "/login" },

  callbacks: {
    async signIn({ user }) {
      const email = user?.email?.toLowerCase();
      if (email && ALLOWED_EMAILS.includes(email)) {
        return true; // ✅ allow
      }
      // 🚫 block anything else
      return "/login?error=AccessDenied";
    },

    async jwt({ token, user, profile }) {
      if (user) {
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        (token as any).picture =
          (user as any)?.image ??
          (profile as any)?.picture ??
          (token as any).picture;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = (token.name as string) ?? session.user.name;
        session.user.email = (token.email as string) ?? session.user.email;
        (session.user as any).image =
          (token as any).picture ?? (session.user as any).image;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };