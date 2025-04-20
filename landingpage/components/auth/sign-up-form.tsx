'use client';

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useActionState } from 'react'
import { signUp } from '@/lib/actions';
import { CircleAlertIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialState = {
    message: '',
  }

export default function SignUpForm() {

const router = useRouter()
const [state, formAction, pending] = useActionState(

    async (state: { message: string }, formData: FormData) => {
        try {
          await signUp(formData);
          router.push('/profile-setup')
          return { message: '' }; // Clear the error message on success
        } catch (e) {
          // Map the error message to a custom string
          if (e instanceof Error) {
            return { message: e.message };
          }
          return { message: 'An unexpected error occurred. Please try again later.' };
        }
      },
      initialState
    );
    return (
        <form
                className="space-y-4"
                action={formAction}
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
                    {state?.message && (
                      <div className="flex flex-row items-start gap-2 justify-center items-center">
                        <CircleAlertIcon className="text-red-500 place-self-center" />
                        <p aria-live="polite" className="text-red-500 text-sm">{state.message}</p>
                      </div>
                    )}
                  </div>
                  <Button className="w-full" type="submit" disabled={pending}>
                    Sign Up
                  </Button>
                </div>
              </form>
    )
}