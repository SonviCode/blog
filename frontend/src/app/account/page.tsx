"use client";

import ConnectModal from "./_components/ConnectModal";
import UserAccount from "./_components/UserAccount";
import styles from "./account.module.scss";

export default function Auth() {
  const user = null;
  return (
    <main className={styles.main}>
      {user && Object.keys(user!).length > 0 ? (
        <UserAccount user={user} />
      ) : (
        <ConnectModal />
      )}
    </main>
  );
}
