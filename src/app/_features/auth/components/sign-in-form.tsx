import { signIn } from '@/app/_features/auth/actions';
import { Badge } from '@/app/_ui/components/badge';
import { Button } from '@/app/_ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_ui/components/card';
import { Input } from '@/app/_ui/components/input';
import { Label } from '@/app/_ui/components/label';
import { cn } from '@/app/_ui/lib/utils';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';

/**
 * Sign in form component.
 */
export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className="relative w-[30rem]">
      <CardHeader>
        <CardTitle className="font-mono text-4xl font-bold">Sign in</CardTitle>

        <CardDescription className="font-sans">
          Access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="font-mono" id="sign-in-form" action={action}>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>

              <Input
                className={cn({
                  'border-destructive focus-visible:ring-0':
                    state?.errors?.email,
                })}
                id="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {state?.errors?.email && (
                <p className="text-xs text-destructive">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>

              <Input
                className={cn({
                  'border-destructive focus-visible:ring-0':
                    state?.errors?.password,
                })}
                id="password"
                name="password"
                type="password"
                placeholder="·········"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {state?.errors?.password && (
                <p className="text-xs text-destructive">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <p className="font-sans text-sm">
              Do you already have an account? {''}
              <Link className="text-blue-500 underline" href="/sign-up">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full font-mono"
          form="sign-in-form"
          disabled={pending}
        >
          Send
          {pending && <Loader className="animate-spin" size={16} />}
        </Button>
      </CardFooter>

      {state?.invalidCredentials && (
        <Badge
          className="absolute -top-8 right-0 font-mono hover:bg-destructive"
          variant="destructive"
        >
          Invalid email or password
        </Badge>
      )}
    </Card>
  );
}
