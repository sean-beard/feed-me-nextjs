import type { NextApiRequest, NextApiResponse } from "next";
import { get } from "utils/api";
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

  get<SubscriptionsData>({
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/subscription`,
    token: body.authToken,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
