"use client";

import { RootState } from "@/redux/store";
import { User } from "@/types/userTypes";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";
import ConnectModal from "./_components/_auth/ConnectModal";
import UserAccount from "./_components/_user/UserAccount";
import styles from "./account.module.scss";
import AdminAccount from "./admin/page";

export default function Auth() {
  const user: User | null = useSelector((state: RootState) => state.user.value);

  if (user?.role === "admin") return <AdminAccount />;

  return (
    <main className={styles.main}>
      {user && Object.keys(user!).length > 0 ? (
        <UserAccount user={user} />
      ) : (
        <Suspense fallback={<Loading />}>
          <ConnectModal />
        </Suspense>
      )}
    </main>
  );
}
