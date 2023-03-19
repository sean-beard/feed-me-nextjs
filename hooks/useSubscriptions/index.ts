import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "pages/_app";
import { Subscription, SubscriptionContextType } from "./types";

export const SubscriptionContext = createContext<SubscriptionContextType>({
  subscriptions: [],
  subscriptionsLoading: false,
  subscriptionError: "",
  setSubscriptions: () => {},
  fetchSubscriptions: () => {},
});

const ERROR_MESSAGE =
  "Oops! There was an error loading your subscriptions. Please try again later.";

export const useSubscriptions = () => {
  const { user } = useContext(AppContext);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");

  const fetchSubscriptions = useCallback(() => {
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

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return {
    subscriptions,
    subscriptionsLoading,
    subscriptionError,
    fetchSubscriptions,
    setSubscriptions,
  };
};
