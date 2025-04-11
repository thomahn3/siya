import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import { checkProfileSetup } from "@/lib/actions";
import SignInForm from "@/components/signInForm";
import OAuthForm from "@/components/oAuthForm";



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
          <Link className="self-center" href={"/"}><Logo /></Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Github or Google account
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
              <SignInForm />

              <div className="text-center">
                <Button asChild variant="link">
                  <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
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
