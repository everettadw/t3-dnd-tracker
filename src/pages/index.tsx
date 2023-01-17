import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  return (
    <>
      <Head>
        <title>T3 D&D Tracker</title>
        <meta
          name="description"
          content="A D&D tracker for my small group of buddies."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen select-none flex-col items-center justify-center bg-slate-800 text-white">
        <h1 className="text-2xl">
          This page is being used for testing purposes...
        </h1>
        {sessionStatus === "authenticated" ? (
          <>
            <p className="mt-3 font-semibold">
              Your name is {sessionData.user?.name} and your email is{" "}
              {sessionData.user?.email}...
            </p>
            <Image
              className="mt-5 rounded-full"
              src={sessionData.user?.image}
              alt={`${sessionData.user?.name} profile picture`}
              width="100"
              height="100"
            />
          </>
        ) : null}
      </main>
    </>
  );
};

export default Home;

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
