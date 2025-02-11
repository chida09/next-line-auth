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
  debug: true,
});
