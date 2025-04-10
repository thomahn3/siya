'use client';

import { useState, useEffect } from "react";
import { GithubSignIn } from "@/components/github-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/google-sign-in";
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
import React from "react";
import ErrorHandler from "@/components/errorHandler"

export default function SignUpForm({ children }: { children?: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleErrorMessage = (event: CustomEvent) => {
      setErrorMessage(event.detail);
    };

    document.addEventListener("updateErrorMessage", handleErrorMessage as EventListener);

    return () => {
      document.removeEventListener("updateErrorMessage", handleErrorMessage as EventListener);
    };
  }, []);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={"/"} className="self-center">
          <Logo />
        </Link>
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

              {/* Email/Password Sign Up */}
              <form
                className="space-y-4"
                action={async (formData) => {
                  "use server";
                  try {
                    const res = await signUp(formData);
                    if (res.success) {
                      redirect("/profile-setup");
                    }
                  } catch (error) {
                    if (error instanceof Error) {
                      const event = new CustomEvent("updateErrorMessage", { detail: error.message });
                      document.dispatchEvent(event);
                    }
                  }
                }}
              >
                <ErrorHandler errorMessage={errorMessage}>
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
                      {children}
                    </div>
                    <Button className="w-full" type="submit">
                      Sign Up
                    </Button>
                  </div>
                </ErrorHandler>
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
}