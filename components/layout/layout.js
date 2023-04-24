import NavBar from "@/components/navbar/nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="text-black bg-white p-2 px-4 rounded-lg">
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-slate-900 flex min-h-screen">
      <NavBar />
      <div className="bg-slate-200 flex flex-grow my-2 mr-2 rounded-lg p-4">
        <span>{children}</span>
      </div>
    </div>
  );
}
