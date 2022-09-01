import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AppContext } from "pages/_app";
import { AuthCallbackData } from "pages/api/auth-callback";
import useSWR from "swr";

const fetcher = async (url: string): Promise<AuthCallbackData> => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(
      "Oops! There was an error logging in. Please try again later."
    );
  }

  return data;
};

const AuthCallback: NextPage = () => {
  const router = useRouter();
  const { setUser } = useContext(AppContext);

  const { data, error } = useSWR(
    () => router.query.code && `/api/auth-callback?code=${router.query.code}`,
    fetcher
  );

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      localStorage.setItem("state", JSON.stringify({ user: data.user }));
      router.push("/");
    }
  }, [data, router, setUser]);

  return error ? <h1>{error}</h1> : <div>Signing you in...</div>;
};

export default AuthCallback;
