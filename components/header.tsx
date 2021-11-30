// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/EthAddressSearchV... Remove this comment to see the full error message
import { EthAddressSearchView } from "@/components/EthAddressSearchView";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/routing-button' o... Remove this comment to see the full error message
import { RoutingButton } from "@/components/routing-button";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/WalletMetadataVie... Remove this comment to see the full error message
import { WalletMetadataView } from "@/components/WalletMetadataView";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/styles/Layout.module.css' or... Remove this comment to see the full error message
import styles from "@/styles/Layout.module.css";
import { useWeb3React } from "@web3-react/core";
// TODO: layout, style
export default function Header() {
  const { active } = useWeb3React();
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className={styles.header}>
      {active ? (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RoutingButton text="my page" pathname="/profile" />
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RoutingButton text="feed" pathname="/feed" />
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EthAddressSearchView />
        </>
      ) : null}
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <WalletMetadataView />
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  );
}
