// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/store/ceramicStore' or its c... Remove this comment to see the full error message
import { authenticateAndGetClient } from "@/store/ceramicStore";
import { useWeb3React } from "@web3-react/core";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";

export const CeramicContext = React.createContext(null);

export const useCeramicContext = () => {
  return React.useContext(CeramicContext);
};

export const CeramicContextWrapper = ({
  children
}: any) => {
  const web3Context = useWeb3React();
  const { active } = web3Context;

  const [client, setClient] = React.useState();

  const value = { client, setClient };

  const loadCeramicClient = async (isWalletConnected: any) => {
    if (isWalletConnected) {
      const ceramicClient = await authenticateAndGetClient();
      setClient(ceramicClient);
    }
  };
  React.useEffect(() => {
    loadCeramicClient(active);
  }, [active]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CeramicContext.Provider value={value}>{children}</CeramicContext.Provider>
  );
};
