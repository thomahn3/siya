'use server';

import { auth } from "@/lib/auth";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeActions";
import { profileSetupSchema } from "@/lib/schema";
import { Session } from "next-auth";

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

export async function getUserData(session: Session | null) {
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