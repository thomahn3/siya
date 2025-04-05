'use server';

import db from './db/db';
import { schema } from './schema';

export const signUp = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const validatedData = schema.parse({ email, password });
  try {
    await db.user.create({
      data: {
        email: validatedData.email.toLowerCase(),
        password: validatedData.password,
      }
    })
    return { success: true };
  } catch (error) {
    throw new Error("Error Signing Up")
  }
}