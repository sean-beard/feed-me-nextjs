import type { NextApiRequest, NextApiResponse } from "next";

type SubscriptionsData = {
  status: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscriptionsData>
) {
  const body = JSON.parse(req.body);

  if (!body.authToken) {
    res
      .status(400)
      .json({ status: 400, message: "Must provide an auth token." });
  }

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
