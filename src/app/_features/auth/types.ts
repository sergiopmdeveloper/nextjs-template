export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      invalidCredentials?: boolean;
    }
  | undefined;
