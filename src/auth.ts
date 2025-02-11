import type { Session } from "next-auth";
import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.AUTH_LINE_ID ?? "",
      clientSecret: process.env.AUTH_LINE_SECRET ?? "",
      // ref: https://github.com/nextauthjs/next-auth/issues/9596
      checks: ["state"],
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // ref: https://authjs.dev/reference/nextjs
    async session({ session, token: { sub } }): Promise<Session> {

      // subはsubjectの略で、ユーザーの一意の識別子のこと
      if (session.user && sub) {
        session.user.id = sub;
      }
      return session;
    },
  },
  debug: true,
});
