import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { utils } from 'ethers';
import { wagmiProvider } from '@/wallet';
import { valueExists } from '@/utils';

type Params = {
  address: string;
};

export default async function middleware(req: NextRequest) {
  const { address: _addressOrName } = req.page.params as Params;

  const url = req.nextUrl.clone();

  const { url: sourceUrl, nextUrl } = req;

  //const rewriteUrl = new URL('/invalid', sourceUrl).toString();
  url.pathname = '/invalid';
  let rewriteResponse = NextResponse.rewrite(url); // NextResponse.rewrite(rewriteUrl);

  try {
    /**
     * This is all super fast (23:31) and will rule out most bad input
     * Doing this first to prevent having to interact with ethers if possible
     **/
    const valExists = valueExists(_addressOrName);
    const startsWith0x = _addressOrName?.indexOf('0x') !== -1;
    const endsWithEth = _addressOrName?.indexOf('.eth') !== -1;

    if (!valExists || (!startsWith0x && !endsWithEth)) {
      return rewriteResponse;
    }

    // we already check the type up there so casting here so it doesn't bug us
    const addressOrName = _addressOrName as string;

    // it's a valid eth address, proceed
    if (utils.isAddress(addressOrName)) {
      console.info(`test vercel log: utils.isAddress line 40`, utils.isAddress(addressOrName));
      return NextResponse.next();
    }

    const provider = wagmiProvider();
    console.info(`test vercel log: provider line 45`, provider);
    const resolvedAddress = await provider.resolveName(addressOrName);
    console.info(`test vercel log: resolvedAddress line 47`, resolvedAddress);
    // it's a valid ENS name, proceed
    if (resolvedAddress && utils.isAddress(resolvedAddress)) {
      console.info(`test vercel log: utils.isAddress`, utils.isAddress(resolvedAddress));
      return NextResponse.next();
    }

    // sike, get out
    return rewriteResponse;
  } catch (error) {
    console.info(`test vercel log: error line 57`, error);
    console.error(`Error in /nfts/_middleware: `, error instanceof Error ? error.message : error);
  }
  return rewriteResponse;
}
