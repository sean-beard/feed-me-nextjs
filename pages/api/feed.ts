import type { NextApiRequest, NextApiResponse } from "next";
import { get } from "utils/api";
import { validateAuthentication } from "utils/auth";

export interface FeedItem {
  id: number;
  feedName: string;
  title: string;
  description: string;
  url: string;
  pubDate: string;
  isRead: boolean | null;
  currentTime: number | null;
  mediaType: string | null;
  mediaUrl: string | null;
}

export type Feed = FeedItem[];

interface GetFeedResponse {
  status: number;
  feed: Feed;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feed>
) {
  const body = JSON.parse(req.body);

  validateAuthentication(body, res);

  get<GetFeedResponse>({
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/feed`,
    token: body.authToken,
  })
    .then((data) => {
      res.status(data.status).json(data.feed);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
