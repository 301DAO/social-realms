import { retrieveNftDetails } from '@/lib/nft-port-api-wrapper'
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
    query.hasOwnProperty('contract') && query.hasOwnProperty('token_id')
      ? await retrieveNftDetails(req.query.contract as string, req.query.token_id as string)
      : { data: 'no data' }
  //  console.log(`{nft-details: ${JSON.stringify(response)}}`);
  if (response) {
    res.status(200).json({
      image_url: response?.nft?.cached_file_url,
      metadata: response?.nft?.metadata,
    })
  }
}
