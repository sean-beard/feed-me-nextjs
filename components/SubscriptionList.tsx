import React from "react";
import { useSubscriptions } from "hooks/useSubscriptions";
import { useUnsubscribe } from "hooks/useUnsubscribe";

export const SubscriptionList = () => {
  const {
    subscriptions,
    subscriptionsLoading,
    subscriptionError,
    setSubscriptions,
  } = useSubscriptions();

  const { handleUnsubscribe, idUnsubscribing } = useUnsubscribe({
    subscriptions,
    setSubscriptions,
  });

  return (
    <section className="manage-feeds-section">
      <h2>Your subscriptions</h2>

      {subscriptionError && <p className="error">{subscriptionError}</p>}
      {subscriptionsLoading && <p>Loading...</p>}

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
