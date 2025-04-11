import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

import db from "@/lib/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { schema } from "@/lib/schema";
import Google from "next-auth/providers/google"
import { compare } from '@/utils/encryption';

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    GitHub,
    Google({allowDangerousEmailAccountLinking: true}),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = schema.parse(credentials);

        const user = await db.user.findFirst({
          where: {
            email: validatedCredentials.email,
          },
        });

        if (!user) {
          throw new Error('No user', { cause: { server_message: "Invalid email or password" }});
        }

        if (!user.password) {
          throw new Error('No password', { cause: { server_message: "This email was used to sign in with a 3rd party app" }});
        }

        const isPasswordValid = compare(
          validatedCredentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('incorrect password', { cause: { server_message: "Invalid email or password" }});
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) 
      {
      if(account?.error) {
         throw new Error('custom error to the client')
      }
      return true
   },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error('No user ID found in token', { cause: { server_message: "Token is missing user ID" }});
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error('Failed to create session', { cause: { server_message: "Database session creation failed" }});
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
