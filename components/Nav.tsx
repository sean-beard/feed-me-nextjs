import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "pages/_app";
import useSWR from "swr";
import { LogoutData } from "pages/api/logout";

const fetcher = async (url: string): Promise<LogoutData> => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export default function Nav() {
  const { user, setUser } = useContext(AppContext);
  const [shouldLogout, setShouldLogout] = useState(false);

  const { data } = useSWR(() => (shouldLogout ? "/api/logout" : null), fetcher);

  useEffect(() => {
    if (data?.status === 200) {
      setUser(null);
      localStorage.removeItem("state");
    }
  });

  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();
    setShouldLogout(true);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>
        <Link href="/">FeedMe</Link>
      </h1>

      <div style={{ display: "flex", alignItems: "center" }}>
        {user && (
          <>
            <ul style={{ listStyle: "none" }}>
              <li>
                <Link href="/manage">Manage Feeds</Link>
              </li>
            </ul>

            <button style={{ marginLeft: "1rem" }} onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}

        {!user && (
          <a
            style={{ marginLeft: "1rem" }}
            href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/github`}
          >
            Login with Github
          </a>
        )}
      </div>
    </nav>
  );
}
