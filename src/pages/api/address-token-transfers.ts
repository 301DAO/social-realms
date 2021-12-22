import { getTxsForAddress } from '@/lib/covalent-api-wrapper'
import { isValidEthAddress } from '@/util/string-validators'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req
  if (!query) {
    res.status(400).send('Missing query parameters')
  }

  const response =
    query.hasOwnProperty('address') &&
    query.hasOwnProperty('contract_address') &&
    isValidEthAddress(query.address as string) &&
    isValidEthAddress(query.contract_address as string)
      ? await getTxsForAddress(req.query.address as string)
      : { data: 'no data' }

  // console.log(JSON.stringify(query));
  res.status(200).json(response)
}
