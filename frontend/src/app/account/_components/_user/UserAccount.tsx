import { fetchLogout } from "@/service/userService";
import { User } from "@/types/userTypes";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { handleDate } from "../../../../utils/userUtils";
import styles from "./user.module.scss";
import EditUser from "./EditUser";

function UserAccount({ user }: { user: User }) {
  const [isEditUserInfo, setIsEditUserInfo] = useState<boolean>(false);

  return (
    <div className={styles.container_user}>
      <div className={styles.info_user}>
        <div>
          <div className={styles.container_img}>
            <Image
              src={user.imgUser ? user.imgUser : "/no-user-image.jpg"}
              alt="profil de user.firstname"
              fill={true}
              sizes="100 vw"
            />
          </div>
          <h2>
            {user.firstname} {user.name}
          </h2>
          <p>{handleDate(user.date)}</p>
          <p>{user.email}</p>
        </div>
        <p className={styles.edit} onClick={() => setIsEditUserInfo(true)}>
          <FontAwesomeIcon icon={faPenToSquare} /> Modifier mes informations
        </p>
        {/* <p className={styles.edit}>
          <FontAwesomeIcon icon={faLock} /> Modifier mon mot de passe
        </p> */}
        <button className={styles.logout} onClick={() => fetchLogout()}>
          Se déconnecter
        </button>
      </div>

      {isEditUserInfo && <EditUser user={user} />}
    </div>
  );
}

export default UserAccount;
