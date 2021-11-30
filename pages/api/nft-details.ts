// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/lib/nft-port-api-wrapper' or... Remove this comment to see the full error message
import { retrieveNftDetails } from "@/lib/nft-port-api-wrapper";
// TODO: add logging and error handling

export default async function handler(req: any, res: any) {
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
