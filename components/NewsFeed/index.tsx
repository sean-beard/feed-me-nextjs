import { useEffect, useMemo } from "react";
import { useFeed } from "hooks/useFeed";
import { FeedItem } from "./FeedItem";
import { FeedSkeleton } from "./FeedSkeleton";
import { FilterForm } from "./FilterForm";
import { Controls } from "./Controls";

export const NewsFeed = () => {
  const { feed, fetchFeed, feedLoading, feedError, filters, controls } =
    useFeed();

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

      <Controls
        feed={feed}
        feedLoading={feedLoading}
        controls={controls}
        filters={filters}
        fetchFeed={fetchFeed}
      />

      {(!feed || feedLoading) && <FeedSkeleton />}
      {hasNoUnreadItems && <h2>Nothing to see here!</h2>}

      {!!feed.length && !feedLoading && (
        <>
          {feed.map((feedItem) => (
            <FeedItem
              key={feedItem.id}
              feedItem={feedItem}
              isChecked={controls.checkedItemIds.has(feedItem.id)}
              onChange={(e) => {
                let newSet = new Set(controls.checkedItemIds);

                if (e.target.checked) {
                  newSet.add(feedItem.id);
                } else {
                  newSet.delete(feedItem.id);
                }

                controls.setCheckedItemIds(newSet);
              }}
            />
          ))}
        </>
      )}
    </>
  );
};
