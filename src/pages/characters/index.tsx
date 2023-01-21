import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { usePageGuard } from "../../utils/usePageGuard";

const CharacterHomePage: NextPage = () => {
  const { status: sessionStatus } = useSession();
  usePageGuard(sessionStatus);

  return sessionStatus === "authenticated" ? (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>This is the character home page.</h1>
    </main>
  ) : null;
};

export default CharacterHomePage;
