import { useState } from "react";
import styles from "./admin.module.scss";
import AdminCategory from "./AdminCategory";
import { User } from "@/types/userTypes";
import { handleDate } from "../../../../utils/userUtils";
import AdminArticles from "./AdminArticles";
import { fetchLogout } from "@/service/userService";

function AdminAccount({ user }: { user: User }) {
  const [index, setIndex] = useState<number>(1);
  const [showInfos, setShowInfos] = useState<boolean>(true);

  return (
    <div className={styles.admin_container}>
      <div
        className={styles.info_container}
        id={!showInfos ? styles.translate_infos : ""}
      >
        <div>
          <h1>Compte admin</h1>
          <button
            onClick={() => setShowInfos(!showInfos)}
            className={styles.btn_toogle_infos}
          >
            X
          </button>
          <ul>
            <li
              className={index == 1 ? styles.isActive : ""}
              onClick={() => setIndex(1)}
            >
              Catégorie
            </li>
            <li
              className={index == 2 ? styles.isActive : ""}
              onClick={() => setIndex(2)}
            >
              Articles
            </li>
            <li
              className={index == 3 ? styles.isActive : ""}
              onClick={() => setIndex(3)}
            >
              Utilisateur
            </li>
          </ul>
        </div>

        <div className={styles.admin_user}>
          <p>
            {user.firstname} {user.name}
          </p>
          <p>{user.email}</p>
          <p>{handleDate(user.date)}</p>
          <p>{user.id}</p>
          <button onClick={() => fetchLogout()}>Se déconnecter</button>
        </div>
      </div>
      {index == 1 && <AdminCategory />}
      {index == 2 && <AdminArticles userId={user.id} />}
    </div>
  );
}

export default AdminAccount;
