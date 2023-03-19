import Link from "next/link";
import { FeedItem } from "pages/api/feed";

interface FeedItemCardProps {
  item: FeedItem;
}

export const FeedItemCard = ({ item }: FeedItemCardProps) => {
  const className = item.isRead ? "card-panel" : "card-panel unread";

  return (
    <Link className="card-link" href={`/item/${item.id}`}>
      <div className={className}>
        <p>{item.title}</p>
        <p>{item.feedName}</p>
      </div>
    </Link>
  );
};
