import { DIFFERENT_PASSWORD } from "@/constants/constants";
import { User } from "@/types/userTypes";

import { FormEvent, useState } from "react";
import styles from "./edituser.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function EditUser({ user }: { user: User }) {
  const [error, setError] = useState<string>("");
  const [seePswd, setSeePswd] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const elements = e.currentTarget.elements as unknown as HTMLFormElement;
    const password = elements.password.value;
    const password_confirm = elements.password_confirm.value;

    if (password !== password_confirm) {
      setError(DIFFERENT_PASSWORD);
      return;
    }

    //   signUp(formData, setError);
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
        <label htmlFor="email">Email</label>
        <p>{user.email}</p>
      </div>
      <div>
        <label htmlFor="file">Photo de profil</label>
        <input type="file" accept="image/*" id="file" name="file" />
      </div>

      <button>Modifier</button>
      {error && <p className={styles.error_msg}>{error}</p>}
    </form>
  );
}
