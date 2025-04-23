'use server';

import { auth } from "@/lib/auth";
import db from "@/lib/db/db";
import { profileSetupSchema, updateProfileSchema } from "@/lib/schema";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { userRedirect } from "./actions";
import { headers } from "next/headers";

export type State = {
  errors?: {
    id?: string[];
    email?: string[];
    name?: string[];
    phone?: string[];
    postcode?: string[];
    abn?: string[];
    appUseType?: string[];
    entityType?: string[];
  };
  message?: string | null;
};

export const createProfileSetupData = async (prevState: State, formData: FormData): Promise<State> => {
    const session = await auth();

    if (session) {
      const id = session.user?.id;
      const email = formData.get("email");
      const name = formData.get("name");
      const phone = formData.get("phone");
      const postcode = formData.get("postcode");
      const abn = formData.get("abn");
      const appUseType = formData.get("appUseType");
      const entityType = formData.get("entityType");

      console.log({ id, email, name, phone, postcode, abn, appUseType, entityType })
      const validatedData = profileSetupSchema.safeParse({ id, email, name, phone, postcode, abn, appUseType, entityType });
      console.log("validatedData", validatedData);

      if (!validatedData.success) {
        console.log("Validation errors", validatedData.error.flatten().fieldErrors);
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Data validation failed',
        };
      }

      try {
        console.log("databse update");
        await db.user.update({
          where: { id: id },
          data: {
            name: validatedData.data.name,
            phone: validatedData.data.phone,
            postcode: validatedData.data.postcode,
            abn: validatedData.data.abn,
            appUseType: validatedData.data.appUseType,
            entityType: validatedData.data.entityType,
            profileCompleted: true,
          },
        });
      } catch (error) {
        return {
          errors: {},
          message: 'Database error: Error updating user data',
        };
      }

        if (appUseType === "request") {
          redirect("/dashboard-customer");
        } else if (appUseType === "offer") {
          redirect("/dashboard-contractor");
        }

      return {
        errors: {},
        message: "Session not found",
      };
    }

    return { errors: {}, message: null };
};

export async function getUserProfileData(session: Session | null) {
    if (session) {
        return db.user.findUnique({
            where: { id: session.user?.id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                postcode: true,
                abn: true,
                appUseType: true,
                entityType: true,
                reviewee: true,
                reviewer: true,

            },
        });
    }
    return null;
}

export const updateUserProfileData = async (validatedData: any) => {
    

        try {
            console.log("database update");
            await db.user.update({
                where: { id: validatedData.id },
                data: {
                    name: validatedData.name,
                    phone: validatedData.phone,
                    postcode: validatedData.postcode,
                    abn: validatedData.abn,
                },
            });
            return {
                errors: {},
                message: 'Profile updated successfully',
            };
        } catch (error) {
            console.error("Database error:", error);
            return {
                errors: {},
                message: 'Database error: Error updating user data. PLease try agian later.',
            };
        }

};