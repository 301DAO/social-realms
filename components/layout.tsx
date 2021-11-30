import Header from "@/components/header";
import styles from "@/styles/Layout.module.css";
import * as React from "react";

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </>
  );
}
