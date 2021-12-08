import { getTxsForAddress } from "@/lib/covalent-api-wrapper";
import { isValidEthAddress } from "@/util/string-validators";
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
    query.hasOwnProperty("address") && isValidEthAddress(query.address)
      ? await getTxsForAddress(req.query.address)
      : { data: "no data" };

  // console.log(JSON.stringify(response));
  res.status(200).json(response);
}
