import Header from "@/components/header";
// @ts-ignore
import styles from "@/styles/Layout.module.css";
import * as React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
