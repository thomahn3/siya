'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorHandler from "@/components/errorHandler";

export default function SignInForm({ handleSignIn }: { handleSignIn: (formData: FormData) => Promise<string | null> }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const error = await handleSignIn(formData);
      if (error) {
        setErrorMessage(error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </div>
      </ErrorHandler>
    </form>
  );
}