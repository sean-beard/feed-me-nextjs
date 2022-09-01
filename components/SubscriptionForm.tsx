import { useContext, useRef, useState } from "react";
import { AppContext } from "pages/_app";

export const SubscriptionForm = () => {
  const { user } = useContext(AppContext);
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
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading && <h2>Loading...</h2>}
      {errorMessage && <h2>{errorMessage}</h2>}
      {successMessage && <h2>{successMessage}</h2>}

      <form ref={formRef} onSubmit={handleSubscription}>
        <label htmlFor="feedUrl">Subscribe to a feed</label>
        <br />
        <input id="feedUrl" name="feedUrl" type="text" />
        <br />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};
