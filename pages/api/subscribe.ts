import type { NextApiRequest, NextApiResponse } from "next";
import { validateAuthentication } from "utils/auth";

type SubscribeData = {
  status: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeData>
) {
  const body = JSON.parse(req.body);

  validateAuthentication(body, res);

  if (!body.url) {
    res
      .status(400)
      .json({ status: 400, message: "Must provide a subscription URL." });
  }

  fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.authToken}`,
    },
    body: JSON.stringify({ url: body.url }),
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
