// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/header' or its co... Remove this comment to see the full error message
import Header from "@/components/header";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/styles/Layout.module.css' or... Remove this comment to see the full error message
import styles from "@/styles/Layout.module.css";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";

export default function Layout({
  children
}: any) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className={styles.container}>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <main className={styles.content}>{children}</main>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    </>
  );
}
