import { userRedirect } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ userid: string }> }) {

    const session = await auth();
    const userId = (await params).userid;

    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome to the user page!</p>
            <p>User Name: {session?.user?.name}</p>
        </div>
    );
}