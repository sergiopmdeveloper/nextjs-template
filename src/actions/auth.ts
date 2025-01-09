import { signInFormSchema, type SignInFormState } from '@/schemas/auth';

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

  return {};
}
