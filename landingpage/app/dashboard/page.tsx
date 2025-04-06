import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SignOut } from '@/components/sign-out';

const Page = async () => {

    const session = await auth();
    if (!session) redirect('/sign-in');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">Dashbaord</h1>
        <p className="mt-4 text-lg">This is the dashboard page.</p>
        <p className="mt-4 text-lg">Your Email: {session.user?.email}</p>
        <SignOut />
        </div>
    );
}

export default Page;