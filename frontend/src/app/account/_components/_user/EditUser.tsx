import { User } from "@/types/userTypes";
import { FormEvent, useState } from "react";
import styles from "./edituser.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { updateUser } from "@/service/userService";

export default function EditUser({ user }: { user: User }) {
  const [error, setError] = useState<string>("");
  const [updateImg, setUpdateImg] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    updateUser(formData, user.id, setError);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => handleSubmit(e)}
      className={styles.form}
    >
      <div>
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          defaultValue={user.firstname}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user.name}
          required
        />
      </div>
      <div>
        <label htmlFor="file">Image</label>
        {!user.imgUser || updateImg ? (
          <input type="file" accept="image/*" id="file" name="file" required />
        ) : (
          <div className={styles.img_update}>
            <Image src={user.imgUser} alt={user.name} width={30} height={30} />
            <button type="button" onClick={() => setUpdateImg(true)}>
              Changer l&apos;image
            </button>
          </div>
        )}
      </div>

      <button>Modifier</button>
      {error && <p className={styles.error_msg}>{error}</p>}
    </form>
  );
}
