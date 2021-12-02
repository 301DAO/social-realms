import { retrieveNftsByAddress } from "@/lib/nft-port-api-wrapper";
import HttpStatusCode from "http-status-typed";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  if (!query.hasOwnProperty("address")) {
    res.statusCode = HttpStatusCode.BAD_REQUEST;
    res.send({
      status: HttpStatusCode.BAD_REQUEST,
      error: "Missing query parameters",
    });
  }
  let response;
  try {
    response = await retrieveNftsByAddress(req.query.address);
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: 500, error: error });
  }
  response && response.data
    ? res.status(HttpStatusCode.OK).json(response)
    : res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ status: 500, error: response });
}
