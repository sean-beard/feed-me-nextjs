// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type LogoutData = {
  status: number;
  message: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<LogoutData>
) {
  fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
