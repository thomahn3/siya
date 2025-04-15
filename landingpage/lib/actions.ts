"use server";

import { executeAction } from './executeActions';
import db from './db/db';
import { schema, profileSetupSchema } from './schema';
import { auth, signIn } from '@/lib/auth';
import { encrypt } from '@/utils/encryption';
import { Session } from 'next-auth'; // Import Session type from next-auth
import { redirect } from 'next/navigation';


export const signUp = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const validatedData = schema.parse({ email, password });
  const encryptedPassword = await encrypt(validatedData.password);
  try {
  const user = await db.user.findFirst({
    where: {
      email: validatedData.email,
    },
  });
  if (user) {
    console.log("User Aready Exists")
    throw new Error('User already exists', { cause: { server_message: "User already exists." }})
  } else {
    await db.user.create({
      data: {
        email: validatedData.email.toLocaleLowerCase(),
        password: encryptedPassword,
      },
    });
    await signIn('credentials', formData);
  }
  } catch (e) {
    if (e instanceof Error) {
      if (e.cause && typeof e.cause === "object" && "server_message" in e.cause) {
        throw new Error(typeof e.cause.server_message === "string" ? e.cause.server_message : "An unknown error occurred")
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
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      if (session) {
        const id = session.user?.id;
        const name = formData.get("name");
        const phone = formData.get("phone");
        const postcode = formData.get("postcode");
        const abn = formData.get("abn");
        const appUseType = formData.get("appUseType");
        const entityType = formData.get("entityType");

        const validatedData = profileSetupSchema.parse({ id, name, phone, postcode, abn, appUseType, entityType });

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

export async function userRedirect({ session }: { session: Session | null }, useType: boolean = false) {

  
  if (session) {
    let url = ""
    const user = await db.user.findUnique({
      where: { id: session.user?.id }, // Search for the user by id
      select: { appUseType: true }, // Retrieve the appUseType field
    });

    if (useType) {
      var appUseType = user?.appUseType as string | undefined; // Ensure appUseType is treated as a string
      return appUseType
    }

    if (!user) {
      throw new Error("User not found");
    }

    if (session && await checkProfileSetup(session.user?.id) && appUseType === "offer") {
      url = "/dashboard-contractor"
    } else if (session && await checkProfileSetup(session.user?.id) && appUseType === "request") {
      url = "/dashboard-customer"
    } else if (session && !await checkProfileSetup(session.user?.id)) {
      url = "/profile-setup" 
    }

    return url as string
  }

    
}