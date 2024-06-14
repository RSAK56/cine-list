import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { signIn } from "@/app/actions";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    signIn,
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
