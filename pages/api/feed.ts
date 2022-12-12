import type { NextApiRequest, NextApiResponse } from "next";
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

  fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/feed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.authToken}`,
    },
  })
    .then((response) => response.json())
    .then((data: GetFeedResponse) => {
      res.status(data.status).json(data.feed);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
