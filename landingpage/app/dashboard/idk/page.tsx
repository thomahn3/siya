import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SignOut } from '@/components/sign-out';

const Page = async () => {

    const session = await auth();
    if (!session) redirect('/sign-in');

    return (
        <p>idk</p>
    );
}

export default Page;