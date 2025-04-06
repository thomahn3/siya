import { signUp } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GithubSignIn } from "@/components/github-sign-in";
import { auth } from "@/lib/auth";
import { GoogleSignIn } from "@/components/google-sign-in";
import Header from "@/components/ui/header";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="overflow-hidden">
      <Header />
      <div className="mt-40">
        <div className="w-full max-w-sm mx-auto space-y-6 border rounded-lg p-10 shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

          <GithubSignIn />
          <GoogleSignIn />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Sign Up */}
          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              const res = await signUp(formData);
              if (res.success) {
                redirect("/login");
              }
            }}
          >
            <Input
              name="email"
              placeholder="Email"
              type="email"
              required
              autoComplete="email"
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              required
              autoComplete="new-password"
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>

          <div className="text-center">
            <Button asChild variant="link">
              <Link href="/sign-in">Already have an account? Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
