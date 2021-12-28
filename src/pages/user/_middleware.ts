import { NextRequest, NextResponse } from 'next/server'
import { isValidEthAddress } from 'src/utils/string-validators'

const ETHERSCAN_IO = 'https://api.etherscan.io/'
console.log(`key ${process.env.ETHERSCAN_API_KEY}`);

const allowedParams = ['allowed']

export const middleware = async (req: NextRequest) => {
 //   return new NextResponse(JSON.stringify(req.nextUrl))


  const url = req.nextUrl
  let changed = false

  url.searchParams.forEach((_, key) => {
    if (!allowedParams.includes(key)) {
      url.searchParams.delete(key)
      changed = true
    }
  })

  // Avoid infinite loop by only redirecting if the query
  // params were changed
  if (changed) {
    return NextResponse.redirect(url)
    // It's also useful to do a rewrite instead of a redirect
    // return NextResponse.rewrite(url)
  }
}
