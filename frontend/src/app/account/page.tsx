"use client";

import { RootState } from "@/redux/store";
import { User } from "@/types/userTypes";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";
import UserAccount from "./_components/_user/UserAccount";
import styles from "./account.module.scss";
import AdminAccount from "./admin/page";
const ConnectModal = lazy(() => import("./_components/_auth/ConnectModal"));

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
