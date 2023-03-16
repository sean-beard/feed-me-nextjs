import { Dispatch, SetStateAction } from "react";

export interface Subscription {
  id: number;
  feedName: string;
}

export interface SubscriptionContextType {
  subscriptions: Subscription[];
  subscriptionsLoading: boolean;
  subscriptionError: string;
  setSubscriptions: Dispatch<SetStateAction<Subscription[]>>;
  fetchSubscriptions: () => void;
}
