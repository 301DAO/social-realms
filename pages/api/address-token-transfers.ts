// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/util/string-validators' or i... Remove this comment to see the full error message
import { isValidEthAddress } from "@/util/string-validators";
// TODO: add logging and error handling
export default async function handler(req: any, res: any) {
  const { query } = req;
  if (!query) {
    res.status(400).send("Missing query parameters");
  }

  const response =
    query.hasOwnProperty("address") &&
    query.hasOwnProperty("contract_address") &&
    isValidEthAddress(query.address) &&
    isValidEthAddress(query.contract_address)
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'getTxsForAddress'.
      ? await getTxsForAddress(req.query.address, req.query.contract_address)
      : { data: "no data" };

  console.log(JSON.stringify(query));
  res.status(200).json(response);
}
