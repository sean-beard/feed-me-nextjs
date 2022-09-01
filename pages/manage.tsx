import type { NextPage } from "next";
import { SubscriptionForm } from "components/SubscriptionForm";
import { SubscriptionList } from "components/SubscriptionList";

const Manage: NextPage = () => {
  return (
    <>
      <SubscriptionForm />
      <SubscriptionList />
    </>
  );
};

export default Manage;
