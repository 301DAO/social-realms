// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/util/bigNumberConverter' or ... Remove this comment to see the full error message
import { parseBigNumberToString } from "@/util/bigNumberConverter";
export const useBalance = (props: any) => {
  const { account, library, chainId } = props;
  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;
      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);
  return balance === null
    ? "Error"
    : balance
    ? parseBigNumberToString(18, balance).substr(0, 4)
    : "";
};
