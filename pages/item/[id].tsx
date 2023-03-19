import { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import { FeedItem } from "pages/api/feed";

interface Props {
  item: FeedItem | null;
  error: string | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.token;

  if (!token) {
    return { props: { item: null, error: "No auth token provided." } };
  }

  const itemId = context.params?.id;

  if (!itemId) {
    return { props: { item: null, error: "No item ID provided." } };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/item/${itemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return { props: { item: data.item, error: null } };
  } catch (_error) {
    return {
      props: {
        item: null,
        error: "Oops! Something went wrong getting the feed item.",
      },
    };
  }
};

// TODO: extract to helper function
const getParameterByName = (url: string, name: string) => {
  const match = RegExp("[?&]" + name + "=([^&]*)").exec(url);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
};

// TODO: style UI, support video, support audio
const FeedItem: NextPage<Props> = ({ item, error }) => {
  const youtubeVideoId = useMemo(() => {
    if (item?.url && item.url.indexOf("youtube.com")) {
      return getParameterByName(item.url, "v");
    }

    return null;
  }, [item?.url]);

  if (!item) {
    return (
      <h2>{error ?? "Oops! Something went wrong. Please try again later."}</h2>
    );
  }

  const toggleReadStatus = () => {
    // TODO: toggle read status
  };

  return (
    <div>
      <button onClick={toggleReadStatus}>
        {item.isRead ? "Mark as unread" : "Mark as read"}
      </button>

      <h2>{item.title}</h2>

      {item.mediaType === "audio/mpeg" && <div>TODO: audio player</div>}
      {!!youtubeVideoId && <div>TODO: video player</div>}

      {!!item.description && (
        <div dangerouslySetInnerHTML={{ __html: item.description }} />
      )}
    </div>
  );
};

export default FeedItem;
