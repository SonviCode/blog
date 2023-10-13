"use client";

import { useSelector } from "react-redux";
import ConnectModal from "./_components/_auth/ConnectModal";
import UserAccount from "./_components/_user/UserAccount";
import styles from "./account.module.scss";
import { User } from "@/types/userTypes";
import { RootState } from "@/redux/store";
import useCheckCookies from "@/hooks/useCheckCookies";
import AdminAccount from "./_components/_admin/AdminAccount";

export default function Auth() {
  const user: User | null = useSelector((state: RootState) => state.user.value);
  
  useCheckCookies();

  return (
    <main className={styles.main}>
      {user && Object.keys(user!).length > 0 ? (
        user.role === "admin" ? (
          <AdminAccount user={user} />
        ) : (
          <UserAccount user={user} />
        )
      ) : (
        <ConnectModal />
      )}
    </main>
  );
}
