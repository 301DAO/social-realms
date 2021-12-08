import * as React from "react";
import { parseBigNumberToString } from "@/util/bigNumberConverter";


interface IUseEtherUser {
  provider: any;
  address: string | null | undefined;
}

export function useEtherUser({ provider, address }: IUseEtherUser) {
  const [ethAddress, setEthAddress] =
  React.useState<string | null | undefined>(null);
  const [ens, setEns] = React.useState<string | null | undefined>(null);
  const [url, setUrl] = React.useState<string | null | undefined>(null);
  const [avatar, setAvatar] = React.useState<string | null | undefined>(null);
  const [balance, setBalance] = React.useState<string | null | undefined>(null);

  React.useEffect(() => {
    if (!!provider && !!address) {
      let stale = false;
      // only way to use async inside useEffect
      (async () => {
        const ens = address.endsWith(".eth")
          ? address
          : await provider.lookupAddress(address);
        const ethAddress = await provider.resolveName(address);
        setEthAddress(ethAddress);
        !stale && setEns(ens);
        const resolver = await provider.getResolver(ens);
        resolver === null
          ? (setUrl(null), setAvatar(null))
          : (!stale && setUrl(await resolver.getText("url")),
            !stale && setAvatar(await resolver.getText("avatar")));
        const balance = await provider.getBalance(ethAddress);
        !stale && setBalance(parseBigNumberToString(18, balance).substr(0, 4));

      })();
      return () => {
        stale = true;
        setEns(undefined);
        setUrl(undefined);
        setAvatar(undefined);
        setEthAddress(undefined);
        setBalance(undefined);
      };
    }
  }, [address]);
  return { ens, url, avatar, ethAddress, balance };
}
