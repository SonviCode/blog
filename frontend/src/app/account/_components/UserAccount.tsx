import Image from "next/image";
import React from "react";
import styles from "./user.module.scss";
import { User } from "@/types/userTypes";

function UserAccount({ user }: { user: User }) {
  return (
    <div>
      <div className={styles.info_user}>
        <div className={styles.container_img}>
          <Image
            src="/IMG_1371.JPG"
            alt="profil de user.firstname"
            fill={true}
          />
        </div>
        <h2>Tom Sonvico</h2>
      </div>
    </div>
  );
}

export default UserAccount;
