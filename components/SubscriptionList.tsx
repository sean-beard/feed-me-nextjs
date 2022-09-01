import { AppContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";

interface Subscription {
  id: number;
  feedName: string;
}

const ERROR_MESSAGE =
  "Oops! There was an error loading your subscriptions. Please try again later.";

export const SubscriptionList = () => {
  const { user } = useContext(AppContext);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");

    if (!user?.token) {
      return;
    }

    setIsLoading(true);

    fetch("/api/subscriptions", {
      method: "POST",
      body: JSON.stringify({ authToken: user?.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          setErrorMessage(ERROR_MESSAGE);
          return;
        }

        setSubscriptions(data.subscriptions);
      })
      .catch(() => {
        setErrorMessage(ERROR_MESSAGE);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user?.token]);

  return (
    <>
      <h2>Your subscriptions</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {isLoading && <p>Loading...</p>}

      {subscriptions.length > 0 && (
        <ul>
          {subscriptions.map((sub) => (
            <li key={sub.id}>
              <p>{sub.feedName}</p> <button type="button">Unsubscribe</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
