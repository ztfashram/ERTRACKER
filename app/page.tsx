import { auth } from "@clerk/nextjs/server";

export default async function Home() {
    const { userId } = auth();
    return <main>hello {userId}</main>;
}
