import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email field is required.')
    .email('Email format is invalid.'),
  password: z
    .string()
    .min(1, 'Password field is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      invalidCredentials?: boolean;
    }
  | undefined;
