// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "pages/_app";

export type AuthCallbackData = {
  status: number;
  user: User;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthCallbackData>
) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/github/callback?code=${req.query.code}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
