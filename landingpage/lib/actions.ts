'use server';

import { executeAction } from './executeActions';
import db from './db/db';
import { schema, profileSetupSchema } from './schema';
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

export const profileSetup = async (formData: FormData) => {
  console.log("Profile setup action called"); // Debugging
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (session) {
        console.log("Session found:", session); // Debugging
        const id = session.user?.id;
        const name = formData.get("name");
        const phone = formData.get("phone");
        const postcode = formData.get("postcode");
        const abn = formData.get("abn");
        const appUseType = formData.get("appUseType");
        const entityType = formData.get("entityType");
        console.log("Form data:", { id, name, phone, postcode, abn, appUseType, entityType });
        console.log(name) // Debugging

        const validatedData = profileSetupSchema.parse({ id, name, phone, postcode, abn, appUseType, entityType });

        console.log("validated data", validatedData); // Debugging

        await db.user.update({
          where: { id: id },
          data: {
            name: validatedData.name,
            phone: validatedData.phone,
            postcode: validatedData.postcode,
            abn: validatedData.abn,
            appUseType: validatedData.appUseType,
            entityType: validatedData.entityType,
            profileCompleted: true,
          },
        });
      }
    },
    successMessage: "Profile setup completed",
  });
}