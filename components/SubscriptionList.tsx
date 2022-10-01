import { useSubscriptions } from "hooks/useSubscriptions";

export const SubscriptionList = () => {
  const { subscriptions, subscriptionsLoading, subscriptionError } =
    useSubscriptions();

  return (
    <section className="manage-feeds-section">
      <h2>Your subscriptions</h2>

      {subscriptionError && <p className="error">{subscriptionError}</p>}
      {subscriptionsLoading && <p>Loading...</p>}

      {subscriptions.length > 0 && (
        <ul>
          {subscriptions.map((sub) => (
            <li key={sub.id} className="unsubscribe-row">
              <p className="feed">{sub.feedName}</p>{" "}
              <button type="button" className="btn unsubscribe-btn">
                Unsubscribe
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
