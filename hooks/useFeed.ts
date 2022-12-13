import { useContext, useMemo, useState } from "react";
import { Feed } from "pages/api/feed";
import { AppContext } from "pages/_app";
import { useControls } from "./useControls";
import { useFilters } from "./useFilters";

const ERROR_MESSAGE =
  "Oops! There was an error loading your feed. Please try again later.";

export const useFeed = () => {
  const { user } = useContext(AppContext);
  const [feed, setFeed] = useState<Feed>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState("");

  const filters = useFilters();

  const filteredFeed = useMemo(() => {
    return feed
      .filter((item) => {
        const isPodcast = item.mediaType === "audio/mpeg";
        const isYoutubeVideo = item.url.indexOf("youtube.com") > 0;

        if (filters.showArticles && filters.showPodcasts && filters.showYoutube)
          return true;
        if (filters.showPodcasts && filters.showYoutube)
          return isPodcast || isYoutubeVideo;
        if (filters.showPodcasts) return isPodcast;
        if (filters.showYoutube) return isYoutubeVideo;
        if (filters.showArticles) return !isPodcast && !isYoutubeVideo;
      })
      .filter((item) => {
        const searchCriteria =
          item.title.toLowerCase().indexOf(filters.searchTerm) > -1 ||
          item.feedName.toLowerCase().indexOf(filters.searchTerm) > -1 ||
          (item.description || "").toLowerCase().indexOf(filters.searchTerm) >
            -1;

        if (filters.shouldFilterUnread) {
          return !item.isRead && searchCriteria;
        }

        return searchCriteria;
      });
  }, [
    feed,
    filters.showArticles,
    filters.showPodcasts,
    filters.showYoutube,
    filters.searchTerm,
    filters.shouldFilterUnread,
  ]);

  const controls = useControls(filteredFeed);

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
    filters,
    controls,
  };
};
