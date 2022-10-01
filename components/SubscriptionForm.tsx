import { useContext, useRef, useState } from "react";
import { AppContext } from "pages/_app";
import { SubscriptionContext } from "pages/manage";

export const SubscriptionForm = () => {
  const { user } = useContext(AppContext);
  const { fetchSubscriptions } = useContext(SubscriptionContext);

  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscription = (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage("");
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

        setSuccessMessage(message);
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

      {isLoading && <h3>Loading...</h3>}
      {errorMessage && <h3 className="error">{errorMessage}</h3>}
      {successMessage && <h3 className="success">{successMessage}</h3>}

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
          Subscribe
        </button>
      </form>
    </section>
  );
};
