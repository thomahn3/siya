import { signIn } from "@/lib/auth";
import { GithubSignIn } from "@/components/github-sign-in";
import { GoogleSignIn } from "@/components/google-sign-in";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import SignInForm from "@/components/signInForm";

export default async function SignInPage() {
  async function handleSignIn(formData: FormData) {
    "use server";
    await signIn("credentials", formData);
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link className="self-center" href={"/"}>
          <Logo />
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Github or Google account
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

              {/* Client-Side Sign In Form */}
              <SignInForm handleSignIn={handleSignIn} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}