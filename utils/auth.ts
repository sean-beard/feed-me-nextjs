import { NextApiResponse } from "next/types";

interface HttpResponse {
  status: number;
  message: string;
}

export const validateAuthentication = (
  body: any,
  res: NextApiResponse<HttpResponse>
): void => {
  if (!body.authToken) {
    res
      .status(400)
      .json({ status: 400, message: "Must provide an auth token." });
  }
};
