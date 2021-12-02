import { authenticateAndGetClient } from "@/store/ceramicStore";
import CeramicClient from "@ceramicnetwork/http-client";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";

interface ICeramicProps {
  client: typeof authenticateAndGetClient;
  setClient: (client: CeramicClient) => void;
}

export const CeramicContext =
  React.createContext<ICeramicProps>({
    client: authenticateAndGetClient,
    setClient: () => {},
  });

export const useCeramicContext = () => {
  return React.useContext(CeramicContext);
};

interface ICeramicProviderProps {
  children: React.ReactNode;
}

export const CeramicContextWrapper = ({
  children,
}: ICeramicProviderProps) => {

  const web3Context = useWeb3React();
  const { active } = web3Context;

  const [client, setClient] = React.useState<CeramicClient | null | undefined>(null);

  const value = { client, setClient };

  const loadCeramicClient = async (isWalletConnected: boolean) => {
    if (isWalletConnected) {
      const ceramicClient = await authenticateAndGetClient();
      setClient(ceramicClient);
    }
  };
  React.useEffect(() => {
    loadCeramicClient(active);
  }, [active]);

  return (
    <CeramicContext.Provider value={value}>{children}</CeramicContext.Provider>
  );
};
