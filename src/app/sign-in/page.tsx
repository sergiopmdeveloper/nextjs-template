import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

/**
 * Sign in page.
 */
export default function SignIn() {
  return (
    <main>
      <section className="flex h-screen w-full items-center justify-center">
        <Card className="w-[30rem]">
          <CardHeader>
            <CardTitle className="font-mono text-4xl font-bold">
              Sign in
            </CardTitle>

            <CardDescription className="font-sans">
              Access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="font-mono" id="sign-in-form">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" autoComplete="email" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                  />
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
            <Button className="w-full font-mono" form="sign-in-form">
              Send
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
