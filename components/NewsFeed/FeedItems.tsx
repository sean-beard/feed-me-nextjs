import { Feed } from "pages/api/feed";
import { FeedItemCard } from "./FeedItemCard";

interface FeedItemsProps {
  feed: Feed;
}

export const FeedItems = ({ feed }: FeedItemsProps) => {
  return (
    <>
      {feed.map((feedItem) => (
        <div key={feedItem.id} className="feed-row">
          <label>
            <input type="checkbox" value={feedItem.id} />
            <span className="visually-hidden">{feedItem.title}</span>
          </label>
          <FeedItemCard item={feedItem} />
        </div>
      ))}
    </>
  );
};
