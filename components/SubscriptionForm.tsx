import { useContext, useRef, useState } from "react";
import { AppContext } from "pages/_app";
import { SubscriptionContext } from "pages/manage";

export const SubscriptionForm = () => {
  const { user } = useContext(AppContext);
  const { fetchSubscriptions } = useContext(SubscriptionContext);

  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscription = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const url = formData.get("feedUrl");

    setIsLoading(true);

    fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ authToken: user?.token, url }),
    })
      .then((response) => response.json())
      .then(({ status, message }) => {
        if (status !== 200) {
          setErrorMessage(message);
          return;
        }

        formRef.current?.reset();
        fetchSubscriptions();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="manage-feeds-section">
      <h2>Subscribe to a feed</h2>

      {errorMessage && <h3 className="error">{errorMessage}</h3>}

      <form ref={formRef} onSubmit={handleSubscription}>
        <div className="input-field">
          <input
            id="feedUrl"
            name="feedUrl"
            className="input-field"
            type="text"
          />
          <label htmlFor="feedUrl">Enter the RSS feed URL</label>
        </div>

        <button type="submit" className="btn">
          {isLoading ? "Subscribing" : "Subscribe"}
        </button>
      </form>
    </section>
  );
};
