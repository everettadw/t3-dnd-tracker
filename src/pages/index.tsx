import { Spin } from "antd";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const HomePage: NextPage = () => {
  const { status: sessionStatus } = useSession();

  return (
    <>
      <Head>
        <title>D&D Helper - 5e Digital Toolset</title>
        <meta
          name="description"
          content="An unofficial digital toolset for Dungeons & Dragons 5e."
        />
        <link rel="favicon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center pl-10 pr-10">
        {sessionStatus === "loading" ? (
          <div className="flex h-96 flex-col justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="flex min-h-screen w-full max-w-6xl flex-col justify-center gap-10">
            <p className="text-center">
              Welcome to a D&amp;D tracker I made for myself and others. There
              are a few simple tools and a nice &amp; fast searchable database
              of a lot of game info. Enjoy!
            </p>
            <div className="flex w-full max-w-6xl flex-row items-center justify-center gap-10">
              <Link className="w-full" href="/game-info">
                <div className="home-screen-card game-rules-home-screen-card">
                  <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                    Game Info
                  </h2>
                </div>
              </Link>
              {sessionStatus === "authenticated" ? (
                <>
                  <Link className="w-full" href="/characters">
                    <div className="home-screen-card">
                      <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                        Characters
                      </h2>
                    </div>
                  </Link>
                  <Link className="w-full" href="/campaigns">
                    <div className="home-screen-card">
                      <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                        Campaigns
                      </h2>
                    </div>
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
//         onClick={
//           sessionData ? () => void signOut() : () => void signIn("google")
//         }
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
