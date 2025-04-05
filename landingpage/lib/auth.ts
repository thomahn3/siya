import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Github,
    Credentials({
    name: "Credentials",
    credentials: {
      email: {},
      password: {},
    },

    // Logic to check if user exists and if it is correct
    authorize: async (credentials) => {
      if (credentials?.email === process.env.EMAIL && credentials?.password === process.env.PASSWORD) {
        return { email: credentials.email as string, password: credentials.email as string };

      } else {
        throw new Error('Invalid credentials');
      }
    }
  })],
});