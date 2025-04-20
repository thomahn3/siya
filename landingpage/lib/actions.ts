'use server';

import { executeAction } from './executeActions';
import db from './db/db';
import { schema, profileSetupSchema } from './schema';
import { auth, signIn, signOut } from '@/lib/auth';
import { hashPassword } from '@/utils/encryption';
import { Session } from 'next-auth'; // Import Session type from next-auth
import { redirect } from 'next/navigation';


export const signUp = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const validatedData = schema.parse({ email, password });
  const hashedPassword = await hashPassword(validatedData.password);

  try {
    const user = await db.user.findFirst({
      where: {
        email: validatedData.email,
      },
    });

    if (user) {
      throw new Error('User already exists', { cause: { server_message: "User already exists." } });
    } else {
      await db.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          hashedPassword: hashedPassword, // Ensure this matches the schema
        },
      });

      await signIn('credentials', formData);
    }
  } catch (e) {
    console.error("Error in signUp:", e); // Log the error for debugging
    if (e instanceof Error) {
      if (e.cause && typeof e.cause === "object" && "server_message" in e.cause) {
        throw new Error(typeof e.cause.server_message === "string" ? e.cause.server_message : "An unknown error occurred");
      }
    }
  }
};

export const signInServer = async (type: string, formdata?: FormData) => {
  try {
    const result = await signIn(type, formdata);
    return result;
  } catch (e) {
    if (e instanceof Error) {
      if (e.cause && typeof e.cause === "object" && "server_message" in e.cause) {
        throw new Error(typeof e.cause.server_message === "string" ? e.cause.server_message : "An unknown error occurred");
      }
    }
  }
};  

export const signOutServer = async () => {
    await signOut({ redirect: false });
    redirect("/sign-in");
};

export const checkProfileSetup = async (id: string | undefined) => {
    const user = await db.user.findUnique({
      where: { id: id }, // Search for the user by id
      select: { profileCompleted: true }, // Only retrieve the profileCompleted field
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user.profileCompleted; // Return the profileCompleted value
};

export async function userRedirect({ session }: { session: Session | null }, useType: boolean = false) {
  if (session) {
    const user = await db.user.findUnique({
      where: { id: session.user?.id },
      select: { appUseType: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const appUseType = user?.appUseType as string | undefined;

    if (useType) {
      return appUseType; // Return appUseType if requested
    }

    if (await checkProfileSetup(session.user?.id)) {
      if (appUseType === "offer") {
        return "/dashboard-contractor";
      } else if (appUseType === "request") {
        return "/dashboard-customer";
      }
    }

    return "/profile-setup"; // Fallback for incomplete profiles
  }

  return null; // Return null if no session is found
}