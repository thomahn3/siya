'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react'; // Use next-auth's client-side signIn
import { CircleAlertIcon } from 'lucide-react';
import { GithubIcon } from './ui/github';
import { GoogleIcon } from './ui/google';
import { useState, startTransition, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function OAuthForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Access query parameters
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const error = searchParams.get('error'); // Get the 'error' query parameter
    if (pathname === "/sign-in" && error === "OAuthAccountNotLinked") {
      setErrorMessage("Email already in use.");
      setPending(false);
    }
  }, [pathname, searchParams]);

  const handleOAuthSignIn = (provider: string) => {
    setPending(true); // Set pending state
    startTransition(async () => {
        await signIn(provider);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => handleOAuthSignIn('github')}
        disabled={pending}
      >
        <GithubIcon />
        Continue with GitHub
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => handleOAuthSignIn('google')}
        disabled={pending}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
      {errorMessage && (
        <div className="flex flex-row items-start gap-2 justify-center items-center">
          <CircleAlertIcon className="text-red-500 place-self-center" size={16} />
          <p aria-live="polite" className="text-red-500 text-sm">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}