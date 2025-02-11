import { auth } from "@/auth";
import SignOut from "@/components/sing-out";

export default async function Home() {
  const session = await auth()
  console.log('session', session);

  return (
    <div>
      <p>Welcome to {session?.user?.name ?? '-'}</p>
      <SignOut/>
    </div>
  );
}
