import type { NextPage } from "next";
import { SubscriptionForm } from "components/SubscriptionForm";
import { SubscriptionList } from "components/SubscriptionList";
import { SubscriptionContext, useSubscriptions } from "hooks/useSubscriptions";

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
