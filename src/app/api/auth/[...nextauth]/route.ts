import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import prisma from "../../../lib/prisma";

async function createUser(email: string, name: string, image: string) {
  try {
    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        image,
      },
    });

    // Create an empty WatchList for the new user
    await prisma.watchList.create({
      data: {
        userId: newUser.id,
        movieIds: "[]",
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      try {
        const email = user.email;
        const name = user.name || profile.name || "";
        const image = user.image || profile.avatar_url || "";

        // Check if the user already exists in your database
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!existingUser) {
          await createUser(email, name, image);
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
