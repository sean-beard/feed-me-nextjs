import "../styles/globals.css";
import Link from "next/link";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>
            <a href="/">FeedMe</a>
          </h1>

          <div style={{ display: "flex", alignItems: "center" }}>
            <ul style={{ listStyle: "none" }}>
              <li>
                <Link href="/manage">Manage Feeds</Link>
              </li>
            </ul>

            <a style={{ marginLeft: "1rem" }} href="#">
              Login with Github
            </a>
          </div>
        </nav>

        <main>
          <Component {...pageProps} />
        </main>

        <footer>This is the footer</footer>
      </div>
    </>
  );
}

export default MyApp;
