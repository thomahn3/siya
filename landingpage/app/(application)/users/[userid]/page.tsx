export default async function Page({
    params,
}: {
    params: Promise<{ userid: string }>;
}) {

    const userId = (await params).userid;
    

    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome to the user page!</p>
            <p>User ID: {userId}</p>
        </div>
    );
}