import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import db from "@/lib/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { schema } from '@/lib/schema';
import { v4 as uuid } from 'uuid';
import {encode as DefaultEncode} from "next-auth/jwt";

const adapter = PrismaAdapter(db as any);


export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
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

        const validatedCredentials = schema.parse(credentials);
        
        const user = await db.user.findFirst({
          where: {
            email: validatedCredentials.email,
            password: validatedCredentials.password,
          }
        })

        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      }
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === 'credentials') {
        token.credentials = true;
      }
      return token;
    }
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return DefaultEncode(params);
    },
  },
});
