import { fetchLogout } from "@/service/userService";
import { User } from "@/types/userTypes";
import { faLock, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { handleDate } from "../../../../utils/userUtils";
import styles from "./user.module.scss";

function UserAccount({ user }: { user: User }) {
  console.log(user);

  return (
    <div className={styles.container_user}>
      <div className={styles.info_user}>
        <div className={styles.container_img}>
          <Image
            src={user.imgUser ? user.imgUser : "/no-user-image.jpg"}
            alt="profil de user.firstname"
            fill={true}
          />
        </div>
        <h2>
          {user.firstname} {user.name}
        </h2>
        <p>{handleDate(user.date)}</p>
        <p>{user.email}</p>
        <p className={styles.edit}>
          <FontAwesomeIcon icon={faPenToSquare} /> Modifier mes informations
        </p>
        {/* <p className={styles.edit}>
          <FontAwesomeIcon icon={faLock} /> Modifier mon mot de passe
        </p> */}
      </div>
      <button className={styles.logout} onClick={() => fetchLogout()}>
        Se déconnecter
      </button>
    </div>
  );
}

export default UserAccount;
