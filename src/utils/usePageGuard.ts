import { useRouter } from "next/router";

const usePageGuard = (sessionStatus: string) => {
  const router = useRouter();

  if (sessionStatus === "unauthenticated") router.push("/").catch(console.log);
};

export { usePageGuard };
