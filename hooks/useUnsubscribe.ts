import { AppContext } from "pages/_app";
import { useContext, useState } from "react";
import { Subscription } from "./useSubscriptions";

interface UseUnsubscribeProps {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
}

export const useUnsubscribe = ({
  subscriptions,
  setSubscriptions,
}: UseUnsubscribeProps) => {
  const { user } = useContext(AppContext);
  const [idUnsubscribing, setIdUnsubscribing] = useState<number | null>(null);

  const handleUnsubscribe = (subscriptionId: number) => {
    setIdUnsubscribing(subscriptionId);

    fetch("/api/unsubscribe", {
      method: "DELETE",
      body: JSON.stringify({ authToken: user?.token, subscriptionId }),
    })
      .then((resp) => resp.json())
      .then(() => {
        setSubscriptions(
          subscriptions.filter((sub) => sub.id !== subscriptionId)
        );
      })
      .finally(() => {
        setIdUnsubscribing(null);
      });
  };

  return {
    idUnsubscribing,
    handleUnsubscribe,
  };
};
