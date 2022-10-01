import React, { useEffect, useState } from "react";
import "styles/globals.css";
import "styles/nav.css";
import "styles/subscription.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Nav from "components/Nav";
import Script from "next/script";

export interface User {
  name: string;
  email: string;
  token: string;
}
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AppContext = React.createContext<AppContextType>({
  user: null,
  setUser: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingState = window.localStorage.getItem("state");

    if (!existingState) {
      return;
    }

    const localStorageState = JSON.parse(existingState);
    setUser(localStorageState.user);
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Head>
        <title>FeedMe</title>
        <meta name="description" content="Personalized newsfeed app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></Script>

      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav />

        <main style={{ height: "100%", padding: "2rem" }}>
          <Component {...pageProps} />
        </main>

        <footer style={{ padding: "2rem" }}>This is the footer</footer>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
