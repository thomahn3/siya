'use server';

import { executeAction } from './executeActions';
import db from './db/db';
import { schema } from './schema';
import { auth, signIn } from '@/lib/auth';


export const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });
      await db.user.create({
        data: {
          email: validatedData.email.toLocaleLowerCase(),
          password: validatedData.password,
        },
      });
      await signIn("credentials", formData);
    },
    successMessage: "Signed up successfully",
  });
};

export const profileSetup = async (id: string | undefined) => {
    const user = await db.user.findUnique({
      where: { id: id }, // Search for the user by id
      select: { profileCompleted: true }, // Only retrieve the profileCompleted field
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user.profileCompleted; // Return the profileCompleted value
};