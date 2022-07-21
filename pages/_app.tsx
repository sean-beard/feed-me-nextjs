import React, { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Nav from "components/Nav";

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

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Head>
        <title>FeedMe</title>
        <meta name="description" content="Personalized newsfeed app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2rem",
        }}
      >
        <Nav />

        <main>
          <Component {...pageProps} />
        </main>

        <footer>This is the footer</footer>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
