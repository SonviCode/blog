"use client";

import useCheckCookies from "@/hooks/useCheckCookies";
import { RootState } from "@/redux/store";
import { User } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
const ConnectModal = lazy(() => import("./_components/_auth/ConnectModal"));
import UserAccount from "./_components/_user/UserAccount";
import styles from "./account.module.scss";
import AdminAccount from "./admin/page";
import Loading from "../loading";

export default function Auth() {
  const user: User | null = useSelector((state: RootState) => state.user.value);

  const router = useRouter();

  useCheckCookies();

  // useEffect(() => {
  //   if (user?.role === "admin") router.push("/account/admin");
  // }, [user]);

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
