'use server';

import { signInFormSchema, type SignInFormState } from '@/schemas/auth';
import db from '@/utils/prisma';
import argon2 from 'argon2';

/**
 * Signs the user in.
 * @param {SignInFormState} _ - The current form state.
 * @param {FormData} formData - The form data.
 * @returns {Promise<SignInFormState>} The new form state.
 */
export async function signIn(
  _: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  const validatedFields = signInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user || !(await argon2.verify(user.password, password))) {
    return {
      invalidCredentials: true,
    };
  }

  return {};
}
