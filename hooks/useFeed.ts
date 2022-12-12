import { Feed } from "pages/api/feed";
import { AppContext } from "pages/_app";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

const ERROR_MESSAGE =
  "Oops! There was an error loading your feed. Please try again later.";

export const useFeed = () => {
  const { user } = useContext(AppContext);
  const [feed, setFeed] = useState<Feed>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState("");

  const [showArticles, setShowArticles] = useState(true);
  const [showPodcasts, setShowPodcasts] = useState(true);
  const [showYoutube, setShowYoutube] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeed = useMemo(() => {
    return feed
      .filter((item) => {
        const isPodcast = item.mediaType === "audio/mpeg";
        const isYoutubeVideo = item.url.indexOf("youtube.com") > 0;

        if (showArticles && showPodcasts && showYoutube) return true;
        if (showPodcasts && showYoutube) return isPodcast || isYoutubeVideo;
        if (showPodcasts) return isPodcast;
        if (showYoutube) return isYoutubeVideo;
        if (showArticles) return !isPodcast && !isYoutubeVideo;
      })
      .filter((item) => {
        return (
          item.title.toLowerCase().indexOf(searchTerm) > -1 ||
          item.feedName.toLowerCase().indexOf(searchTerm) > -1 ||
          (item.description || "").toLowerCase().indexOf(searchTerm) > -1
        );
      });
  }, [feed, showArticles, showPodcasts, showYoutube, searchTerm]);

  const fetchFeed = () => {
    setFeedError("");

    if (!user?.token) {
      return;
    }

    setFeedLoading(true);

    fetch("/api/feed", {
      method: "POST",
      body: JSON.stringify({ authToken: user?.token }),
    })
      .then((response) => response.json())
      .then((feed) => {
        setFeed(feed);
      })
      .catch(() => {
        setFeedError(ERROR_MESSAGE);
      })
      .finally(() => {
        setFeedLoading(false);
      });
  };

  return {
    feed: filteredFeed,
    fetchFeed,
    feedLoading,
    feedError,
    filters: {
      showArticles,
      setShowArticles,
      showPodcasts,
      setShowPodcasts,
      showYoutube,
      setShowYoutube,
      searchTerm,
      setSearchTerm,
    },
  };
};
