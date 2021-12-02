import { retrieveNftDetails } from "@/lib/nft-port-api-wrapper";
// TODO: add logging and error handling
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  if (!query) {
    res.status(400).send("Missing query parameters");
  }

  const response =
    query.hasOwnProperty("contract_address") && query.hasOwnProperty("token_id")
      ? await retrieveNftDetails(req.query.contract_address, req.query.token_id)
      : { data: "no data" };

  console.log(`{nft-details: ${JSON.stringify(response)}}`);
  res.status(200).json(response);
}
