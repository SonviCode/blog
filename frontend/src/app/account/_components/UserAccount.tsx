import { User } from "@/types/userTypes";
import Image from "next/image";
import styles from "./user.module.scss";
import { handleDate } from "../../../utils/userUtils";

function UserAccount({ user }: { user: User }) {
  console.log(user);

  return (
    <>
      <div className={styles.info_user}>
        <div className={styles.container_img}>
          <Image
            src="/IMG_1371.JPG"
            alt="profil de user.firstname"
            fill={true}
          />
        </div>
        <h2>
          {user.firstname} {user.name}
        </h2>
        <p>{handleDate(user.date)}</p>
        <p>{user.email}</p>
        {user.role === "admin" && <p>{user.role}</p>}
      </div>
    </>
  );
}

export default UserAccount;
