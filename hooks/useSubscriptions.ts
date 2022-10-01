import { AppContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";

interface Subscription {
  id: number;
  feedName: string;
}

const ERROR_MESSAGE =
  "Oops! There was an error loading your subscriptions. Please try again later.";

export const useSubscriptions = () => {
  const { user } = useContext(AppContext);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");

  useEffect(() => {
    setSubscriptionError("");

    if (!user?.token) {
      return;
    }

    setSubscriptionsLoading(true);

    fetch("/api/subscriptions", {
      method: "POST",
      body: JSON.stringify({ authToken: user?.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          setSubscriptionError(ERROR_MESSAGE);
          return;
        }

        setSubscriptions(data.subscriptions);
      })
      .catch(() => {
        setSubscriptionError(ERROR_MESSAGE);
      })
      .finally(() => {
        setSubscriptionsLoading(false);
      });
  }, [user?.token]);

  return {
    subscriptions,
    subscriptionsLoading,
    subscriptionError,
  };
};
