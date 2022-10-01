import { createContext, Dispatch, SetStateAction } from "react";
import type { NextPage } from "next";
import { SubscriptionForm } from "components/SubscriptionForm";
import { SubscriptionList } from "components/SubscriptionList";
import { Subscription, useSubscriptions } from "hooks/useSubscriptions";

interface SubscriptionContextType {
  subscriptions: Subscription[];
  subscriptionsLoading: boolean;
  subscriptionError: string;
  setSubscriptions: Dispatch<SetStateAction<Subscription[]>>;
  fetchSubscriptions: () => void;
}

export const SubscriptionContext = createContext<SubscriptionContextType>({
  subscriptions: [],
  subscriptionsLoading: false,
  subscriptionError: "",
  setSubscriptions: () => {},
  fetchSubscriptions: () => {},
});

const Manage: NextPage = () => {
  const useSubscriptionsPayload = useSubscriptions();

  return (
    <SubscriptionContext.Provider value={useSubscriptionsPayload}>
      <SubscriptionForm />
      <SubscriptionList />
    </SubscriptionContext.Provider>
  );
};

export default Manage;
