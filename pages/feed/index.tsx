// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/FeedCard' or its ... Remove this comment to see the full error message
import { FeedCard } from "@/components/FeedCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/contexts/CeramicContext' or ... Remove this comment to see the full error message
import { useCeramicContext } from "@/contexts/CeramicContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/store/ceramicStore' or its c... Remove this comment to see the full error message
import { loadFollowing } from "@/store/ceramicStore";
import { Spacer } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";

export const FAKE_FEED = [
  {
    address: "0x983110309620D911731Ac0932219af06091b6744",
    ens: "brantly.eth",
    balance: "2.46",
    url: "http://brantly.xyz/",
    avatar: "eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/2430",
    img: "https://api.wrappedpunks.com/images/punks/2430.png",
    text: "Swapped 25 ETH for 420.69 USDC on PussySwap v69 💸",
    details: "",
  },
  {
    address: "0x648aA14e4424e0825A5cE739C8C68610e143FB79",
    ens: "sassal.eth",
    balance: "69.46",
    url: "http://jondoe.pizza/",
    avatar: "eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/6571",
    img: "https://lh3.googleusercontent.com/-w3k-j9DHgkrIJ10IJ7aNmRSawLKJW3JLtLjTH9jHyxEmgBb30KFj82YX59kQImzDZy1yiu5Gv7YyAJwfTtSKcToffSM3-OcdILkNg=w600",
    text: "Minted a new ERC-721 token: CryptoPunk[6969] 🎨",
    detail: "",
  },
  {
    address: "0x648aA14e4424e0825A5cE739C8C686123985271",
    ens: "krypto.eth",
    balance: "0.87",
    url: "http://jondoe.pizza/",
    avatar: "eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/6571",
    img: "https://lh3.googleusercontent.com/YinTK0CUDPGnoE-7RPOuSlDSO8-3WyNrpkzcOXPtKRl36yuhMGoJjLfzrCyx15bh8gCYZf33SxALC_FxxnW-tNJpUIubv4CUeAcnLDQ=s0",
    text: "Withdrew 75% of LINK-USDT liquidity pool 🐻 📉",
    detail: "",
  },
];

export default function Feed() {
  const web3Context = useWeb3React();
  const { library } = web3Context;

  const { client } = useCeramicContext();

  const [followingTransactions, setFollowingTransactions] = React.useState([]);
  const [following, setFollowing] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      if (client && library) {
        const { following } = await loadFollowing(client);
        setFollowing(following);
        library.on("block", async (blockNumber: any) => {
          console.log(blockNumber);
          const allBlockInfo = await library.getBlockWithTransactions(
            blockNumber
          );
          console.log(allBlockInfo);

          const newTxs = allBlockInfo.transactions
            .filter((transaction: any) => {
              return (
                following.includes(transaction.to) ||
                following.includes(transaction.from)
              );
            })
            .map((transaction: any) => ({
            ...transaction,
            timestamp: allBlockInfo.timestamp
          }));

          setFollowingTransactions((previousFollowingTransactions: any) => {
            const transactions = [];
            for (let prevIndex in previousFollowingTransactions) {
              for (let curIndex in newTxs) {
                if (
                  newTxs[curIndex].hash ===
                  previousFollowingTransactions[prevIndex].hash
                ) {
                  transactions.push(newTxs[curIndex]);
                  delete previousFollowingTransactions[prevIndex];
                  delete newTxs[curIndex];
                }
              }
            }
            for (const prevTx of previousFollowingTransactions) {
              transactions.push(prevTx);
            }
            for (const curTx of newTxs) {
              transactions.push(curTx);
            }

            transactions.sort((a, b) => b.timestamp - a.timestamp);
            return transactions.slice(0, 50);
          });
        });
      }
    })();

    return () => {
      if (library) {
        library.removeAllListeners("block");
      }
    };
  }, [client, library]);

  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div>
      {!following || following.length === 0 ? (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <p>
          Currently you are following no one. Use the search bar to find more
          users to follow.
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </p>
      ) : followingTransactions.length === 0 ? (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <p>Currently there is no events observed, please wait...</p>
      ) : (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        followingTransactions.map((tx: any) => <div key={tx.hash}>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <FeedCard transactionDetail={tx} />
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Spacer />
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>)
      )}
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  );
}
