"use client";

import { RootState } from "@/redux/store";
import { fetchLogout } from "@/service/userService";
import { User } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { handleDate } from "../../../utils/userUtils";
import AdminArticles from "./_components/article/AdminArticles";
import AdminCategory from "./_components/category/AdminCategory";
import AdminUser from "./_components/user/AdminUser";
import styles from "./adminaccount.module.scss";

function AdminAccount() {
  const [index, setIndex] = useState<number>(1);

  const user: User | null = useSelector((state: RootState) => state.user.value);

  const router = useRouter();

  if (!user) {
    router.push("/");
    return;
  }

  return (
    <div className={styles.admin_container}>
      <div className={styles.info_container}>
        <div>
          <h1>Compte admin</h1>

          <ul>
            {["Catégorie", "Articles", "Utilisateur"].map((element, i) => (
              <li
                key={i}
                className={index == i + 1 ? styles.isActive : ""}
                onClick={() => setIndex(i + 1)}
              >
                {element}
              </li>
            ))}
          </ul>
        </div>

        <button
          className={styles.back_website}
          onClick={() => router.push("/")}
        >
          Retour sur le site
        </button>

        <div className={styles.admin_user}>
          <p>
            {user.firstname} {user.name}
          </p>
          <p>{user.email}</p>
          <p>{handleDate(user.date)}</p>
          <p>{user.id}</p>
          <button className={styles.logout} onClick={() => fetchLogout()}>
            Se déconnecter
          </button>
        </div>
      </div>
      {index == 1 && <AdminCategory />}
      {index == 2 && <AdminArticles />}
      {index == 3 && <AdminUser />}
    </div>
  );
}

export default AdminAccount;
