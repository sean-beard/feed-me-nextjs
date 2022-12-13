import { useContext } from "react";
import { FeedItem } from "pages/api/feed";
import { AppContext } from "pages/_app";
import { useFeed } from "hooks/useFeed";

interface Props {
  feed: FeedItem[];
  feedLoading: boolean;
  controls: ReturnType<typeof useFeed>["controls"];
  filters: ReturnType<typeof useFeed>["filters"];
  fetchFeed: () => void;
}

export const Controls = ({
  feed,
  feedLoading,
  controls,
  filters,
  fetchFeed,
}: Props) => {
  const { user } = useContext(AppContext);

  const mobileFilterClassName = `btn mobile-filter ${
    filters.shouldFilterUnread ? "mobile-filtered" : "mobile-unfiltered"
  }`;

  const handleMarkAll = (status: "read" | "unread") => {
    const payload: { id: number; isRead: boolean }[] = [];

    controls.checkedItemIds.forEach((id) => {
      payload.push({ id: id, isRead: status === "read" });
    });

    controls.setIsUpdatingItem(true);

    // TODO: catch/handle error
    fetch("/api/items", {
      method: "PUT",
      body: JSON.stringify({ authToken: user?.token, items: payload }),
    })
      .then((response) => response.json())
      .then(({ status }) => {
        if (status !== 200) {
          // TODO: handle error
          return;
        }

        controls.setAllItemsChecked(false);
        controls.setCheckedItemIds(new Set());
        void fetchFeed();
      })
      .finally(() => {
        controls.setIsUpdatingItem(false);
      });
  };

  return (
    <div className="controls">
      <div className="status-controls">
        {!!feed.length && !feedLoading && (
          <label>
            <input
              type="checkbox"
              checked={controls.allItemsChecked}
              onChange={(e) => {
                controls.setAllItemsChecked(e.target.checked);
              }}
            />
            <span className="visually-hidden">Select all items</span>
          </label>
        )}

        {!!controls.checkedItemIds.size && (
          <div className="btn-wrapper">
            <button
              type="button"
              className="btn control-button"
              disabled={controls.isUpdatingItem}
              onClick={() => {
                handleMarkAll("read");
              }}
            >
              Mark as Read
            </button>
            <button
              type="button"
              className="btn control-button"
              disabled={controls.isUpdatingItem}
              onClick={() => {
                handleMarkAll("unread");
              }}
            >
              Mark as Unread
            </button>
          </div>
        )}
      </div>

      <label className="desktop-filter">
        <input
          type="checkbox"
          checked={filters.shouldFilterUnread}
          onChange={(e) => {
            filters.setShouldFilterUnread(e.target.checked);
          }}
        />
        <span>Filter by unread</span>
      </label>

      <label className={mobileFilterClassName}>
        <input
          type="checkbox"
          className="visually-hidden"
          checked={filters.shouldFilterUnread}
          onChange={(e) => {
            filters.setShouldFilterUnread(e.target.checked);
          }}
        />
        <span className="visually-hidden">Filter by unread</span>
        <i className="material-icons">filter_list</i>
      </label>
    </div>
  );
};
