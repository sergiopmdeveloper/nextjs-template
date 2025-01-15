'use client';

import SignInForm from '@/app/_features/auth/components/sign-in-form';

/**
 * Sign in page.
 */
export default function SignIn() {
  return (
    <main>
      <section className="flex h-screen w-full items-center justify-center">
        <SignInForm />
      </section>
    </main>
  );
}
