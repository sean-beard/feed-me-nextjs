import type { NextApiRequest, NextApiResponse } from "next";
import { validateAuthentication } from "utils/auth";

type SubscriptionsData = {
  status: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscriptionsData>
) {
  const body = JSON.parse(req.body);

  validateAuthentication(body, res);

  fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/subscription`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.authToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
