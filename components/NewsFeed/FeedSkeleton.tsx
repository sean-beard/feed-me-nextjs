import ContentLoader from "react-content-loader";

export const FeedSkeleton = () => {
  return (
    <div>
      <ContentLoader height="75" className="feed-skeleton">
        <rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>
      <ContentLoader height="75" className="feed-skeleton">
        <rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>
      <ContentLoader height="75" className="feed-skeleton">
        <rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>
      <ContentLoader height="75" className="feed-skeleton">
        <rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>
    </div>
  );
};
