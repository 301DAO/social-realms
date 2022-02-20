import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { utils } from 'ethers';
import { wagmiProvider } from '@/wallet';
import { valueExists } from '@/utils';

type Params = {
  address: string;
};

// TODO: redirect to a page that gives nice feedback to the user instead of login page
export async function middleware(req: NextRequest) {
  const { address: _addressOrName } = req.page.params as Params;

  const { url: sourceUrl } = req;
  const rewriteUrl = new URL('/invalid', sourceUrl).toString();
  let rewriteResponse = NextResponse.rewrite(rewriteUrl);

  /**
   * This is all super fast (23:31) and will rule out most bad input
   * Doing this first to prevent having to interact with ethers if possible
   **/
  const valExists = valueExists(_addressOrName);
  const startsWith0x = _addressOrName?.indexOf('0x') !== -1;
  const endsWithEth = _addressOrName?.indexOf('.eth') !== -1;

  if (!valExists || (!startsWith0x && !endsWithEth)) {
    // set header to "invalid-address"
    rewriteResponse.headers.set(`invalid-param`, _addressOrName);
    return rewriteResponse;
  }

  // we already check the type up there so casting here so it doesn't bug us
  const addressOrName = _addressOrName as string;

  // it's a valid eth address, proceed
  if (utils.isAddress(addressOrName)) {
    return NextResponse.next();
  }

  const provider = wagmiProvider();
  const resolvedAddress = await provider.resolveName(addressOrName);

  // it's a valid ENS name, proceed
  if (resolvedAddress && utils.isAddress(resolvedAddress)) {
    return NextResponse.next();
  }

  rewriteResponse.headers.set(`invalid-param`, addressOrName);
  // sike, get out
  return rewriteResponse;
}
