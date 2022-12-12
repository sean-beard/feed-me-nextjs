import { NextApiResponse } from "next/types";

export const validateAuthentication = (
  body: any,
  res: NextApiResponse
): void => {
  if (!body.authToken) {
    res
      .status(400)
      .json({ status: 400, message: "Must provide an auth token." });
  }
};
