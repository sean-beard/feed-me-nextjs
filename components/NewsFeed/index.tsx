import { useEffect, useMemo } from "react";
import { useFeed } from "hooks/useFeed";
import { FeedItems } from "./FeedItems";
import { FeedSkeleton } from "./FeedSkeleton";
import { FilterForm } from "./FilterForm";

export const NewsFeed = () => {
  const { feed, fetchFeed, feedLoading, feedError, filters } = useFeed();
  const hasNoUnreadItems = useMemo(
    () => !feedLoading && !!feed && !feed.length,
    [feed, feedLoading]
  );

  useEffect(() => {
    void fetchFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (feedError) {
    return <p>{feedError}</p>;
  }

  return (
    <>
      <FilterForm filters={filters} />

      {(!feed || feedLoading) && <FeedSkeleton />}
      {hasNoUnreadItems && <h2>Nothing to see here!</h2>}

      {!!feed.length && <FeedItems feed={feed} />}
    </>
  );
};
