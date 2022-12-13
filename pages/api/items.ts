import type { NextApiRequest, NextApiResponse } from "next";
import { validateAuthentication } from "utils/auth";

interface PutItemResponse {
  status: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  validateAuthentication(body, res);

  fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/item`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.authToken}`,
    },
    body: JSON.stringify({ items: body.items }),
  })
    .then((response) => response.json())
    .then((data: PutItemResponse) => {
      res.status(data.status).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
