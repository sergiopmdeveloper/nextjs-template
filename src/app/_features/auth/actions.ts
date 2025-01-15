'use server';

import { getUserByEmail } from '@/app/_data/user';
import { signInFormSchema } from '@/app/_features/auth/schemas';
import { type SignInFormState } from '@/app/_features/auth/types';
import {
  authenticateUser,
  verifyUserPassword,
} from '@/app/_features/auth/utils';

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

  const user = await getUserByEmail(email);

  if (!user || !(await verifyUserPassword(user, password))) {
    return {
      invalidCredentials: true,
    };
  }

  await authenticateUser(user.id);
}
