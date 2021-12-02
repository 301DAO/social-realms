import * as React from "react";

type UseEnsDataProps = {
  provider: any;
  address: string | null | undefined;
};

export function useEnsData({ provider, address }: UseEnsDataProps) {
  const [ethAddress, setEthAddress] = React.useState<string | null | undefined>(
    null
  );
  const [ens, setEns] = React.useState<string | null | undefined>(null);
  const [url, setUrl] = React.useState<string | null | undefined>(null);
  const [avatar, setAvatar] = React.useState<string | null | undefined>(null);

  React.useEffect(() => {
    if (!!provider && !!address) {
      console.log("provider", provider);
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
      })();
      return () => {
        stale = true;
        setEns(undefined);
        setUrl(undefined);
        setAvatar(undefined);
        setEthAddress(undefined);
      };
    }
  }, [address]);
  return { ens, url, avatar, ethAddress };
}
