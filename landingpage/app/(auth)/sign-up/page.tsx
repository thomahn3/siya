import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "@/components/ui/header";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { signUp, userRedirect } from "@/lib/actions";
import Logo from "@/components/ui/logo";
import { auth } from '@/lib/auth'
import { checkProfileSetup } from '@/lib//actions';
import SignUpForm from "@/components/sign-up-form";
import OAuthForm from "@/components/o-auth-form";

const Page = async () => {
  const session = await auth();

  if (session) {
    const url = await userRedirect({ session });
    if (url) {
      redirect(url); // Ensure redirection happens after OAuth sign-up
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={"/"} className="self-center"><Logo /></Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Sign up with your Github or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <OAuthForm />
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              {/* Email/Password Sign In */}
              <SignUpForm />

              <div className="text-center">
                <Button asChild variant="link">
                  <Link href="/sign-in">Have an account? Sign In</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
