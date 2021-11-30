// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/lib/nft-port-api-wrapper' or... Remove this comment to see the full error message
import { retrieveNftsByAddress } from "@/lib/nft-port-api-wrapper";

export default async function handler(req: any, res: any) {
  const { query } = req;
  if (!query.hasOwnProperty("address")) {
    res.statusCode = 400;
    res.send({ error: "Missing query parameters" });
  }
  try {
    const response = await retrieveNftsByAddress(req.query.address);
    if (response && response.data) {
      res.statusCode = 200;
      res.json(response);
    } else {
      res.statusCode = 500;
      res.json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.statusCode = 403;
    console.log(error);
    if (error.response.status === 403) {
      res.statusCode = 403;
    }
    res.json({ error });
  }
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'response'. Did you mean 'Respons... Remove this comment to see the full error message
  res.status(200).json(response);
}
