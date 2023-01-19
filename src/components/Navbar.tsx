import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthenticatedLinks = () => {
  return (
    <>
      <Link href="/notes" />
      <Link
        href=""
        onClick={(e) => {
          e.preventDefault();
          signOut().catch(console.log);
        }}
      >
        Sign Out
      </Link>
    </>
  );
};

const UnauthenticatedLinks = () => {
  return (
    <>
      <Link
        href=""
        onClick={(e) => {
          e.preventDefault();
          signIn("google").catch(console.log);
        }}
      >
        Sign In
      </Link>
    </>
  );
};

const Navbar = () => {
  const { status: sessionStatus } = useSession();

  return (
    <nav className="fixed top-0 left-0 z-50 flex h-16 min-w-full max-w-full select-none flex-row justify-center bg-slate-800 pl-10 pr-10 text-white">
      <div className="flex h-full w-full max-w-6xl flex-row items-center justify-between">
        <h1 className="text-4xl font-bold">D&amp;D T3 Tracker</h1>
        <div className="flex flex-row gap-5">
          <Link href="/">Home</Link>
          {sessionStatus === "loading" ? null : sessionStatus ===
            "authenticated" ? (
            <AuthenticatedLinks />
          ) : (
            <UnauthenticatedLinks />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
