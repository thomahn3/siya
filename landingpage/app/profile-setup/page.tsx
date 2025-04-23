import React from 'react';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Logo from '@/components/ui/logo';
import ProfileSetupCard from '@/components/profile/profile-setup-card';
  

const Page = async () => {

    const session = await auth();
    if (session) {
        var email = session.user?.email as string;
        var name = session.user?.name as string;
    } else {
        redirect("/sign-up");
    }

// Name
// Email
// Phone
// Suburb
// ABN
// Make money or Make posts
// Personal or Business

return (
    <>
        <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Logo />
                <ProfileSetupCard email={email} name={name}/>
            </div>
        </main>
    </>
)
}

export default Page;