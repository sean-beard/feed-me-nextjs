import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "pages/_app";
import { LogoutData } from "pages/api/logout";

export default function Nav() {
  const { user, setUser } = useContext(AppContext);

  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();

    fetch("/api/logout")
      .then((response) => response.json())
      .then((data: LogoutData) => {
        if (data.status === 200) {
          setUser(null);
          localStorage.removeItem("state");
        }
      });
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="indigo darken-4"
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

            <button
              className="btn"
              style={{ marginLeft: "1rem" }}
              onClick={handleLogout}
            >
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
