// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/lib/covalent-api-wrapper' or... Remove this comment to see the full error message
import { getTxsForAddress } from "@/lib/covalent-api-wrapper";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/util/string-validators' or i... Remove this comment to see the full error message
import { isValidEthAddress } from "@/util/string-validators";
// TODO: add logging and error handling
export default async function handler(req: any, res: any) {
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
