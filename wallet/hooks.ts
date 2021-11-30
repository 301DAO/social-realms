import { useWeb3React } from "@web3-react/core";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
import { injectedConnector } from "./connectors";

// "Eager connect" is to store connectorId in localStorage
export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injectedConnector, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);
  return tried;
};

export const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React();

  React.useEffect(() => {
    const { ethereum } = window;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'EthereumProv... Remove this comment to see the full error message
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("handling 'connect' event..");
        activate(injectedConnector);
      };
      const handleChainChanged = (chainId: any) => {
        console.log(`handling 'chainChanged' event..: ${chainId}`);
        activate(injectedConnector);
      };
      const handleAccountsChanged = (accounts: any) => {
        console.log(
          `handling 'accountsChanged' event with payload ${accounts}`
        );
        if (accounts.length > 0) {
          // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'deactivate'. Did you mean 'activ... Remove this comment to see the full error message
          deactivate(injectedConnector);
          activate(injectedConnector);
        }
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'EthereumProv... Remove this comment to see the full error message
      ethereum.on("connect", handleConnect);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'EthereumProv... Remove this comment to see the full error message
      ethereum.on("chainChanged", handleChainChanged);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'EthereumProv... Remove this comment to see the full error message
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeListener' does not exist on type '... Remove this comment to see the full error message
        if (ethereum.removeListener) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeListener' does not exist on type '... Remove this comment to see the full error message
          ethereum.removeListener("connect", handleConnect);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeListener' does not exist on type '... Remove this comment to see the full error message
          ethereum.removeListener("chainChanged", handleChainChanged);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeListener' does not exist on type '... Remove this comment to see the full error message
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};
