import { GithubSignIn } from "@/components/github-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/google-sign-in";
import Header from "@/components/ui/header";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions";
import Logo from "@/components/ui/logo";
import { auth } from '@/lib/auth'
import { checkProfileSetup } from '@/lib//actions';

const Page = async () => {
  
  const session = await auth();
  if (session && !(await checkProfileSetup(session.user?.id))) {
    redirect("/profile-setup")
  } else if (session && (await checkProfileSetup(session.user?.id))) {
    redirect("/dashboard")
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
              <div className="flex flex-col gap-4">
                <GithubSignIn />
                <GoogleSignIn />
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              {/* Email/Password Sign In */}
              <form
                className="space-y-4"
                action={async (formData) => {
                  "use server";
                  const res = await signUp(formData);
                  if (res.success) {
                    redirect("/profile-setup");
                  }
                }}
              >
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      placeholder="Email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      name="password"
                      placeholder="Password"
                      type="password"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Sign Up
                  </Button>
                </div>
              </form>

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
