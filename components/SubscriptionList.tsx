import React, { useContext } from "react";
import { useUnsubscribe } from "hooks/useUnsubscribe";
import { SubscriptionContext } from "pages/manage";

export const SubscriptionList = () => {
  const {
    subscriptions,
    subscriptionsLoading,
    subscriptionError,
    setSubscriptions,
  } = useContext(SubscriptionContext);

  const { handleUnsubscribe, idUnsubscribing } = useUnsubscribe({
    subscriptions,
    setSubscriptions,
  });

  return (
    <section className="manage-feeds-section">
      <h2>Your subscriptions</h2>

      {subscriptionError && <p className="error">{subscriptionError}</p>}
      {subscriptions.length === 0 && subscriptionsLoading && <p>Loading...</p>}

      {subscriptions.length === 0 &&
        !subscriptionsLoading &&
        !subscriptionError && <p>No subscriptions yet</p>}

      {subscriptions.length > 0 && (
        <ul>
          {subscriptions.map((sub) => (
            <li key={sub.id} className="unsubscribe-row">
              <p className="feed">{sub.feedName}</p>{" "}
              <button
                type="button"
                className="btn unsubscribe-btn"
                onClick={() => {
                  handleUnsubscribe(sub.id);
                }}
              >
                {idUnsubscribing === sub.id ? "Unsubscribing" : "Unsubscribe"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
