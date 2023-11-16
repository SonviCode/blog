import {
  API_SIGNUP,
  DIFFERENT_PASSWORD,
  INPUT_EMPTY,
} from "@/constants/constants";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import styles from "./auth.module.scss";
import { signUp } from "@/service/userService";

export default function SignUp() {
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

    signUp(formData, setError);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => handleSubmit(e)}
      className={styles.form}
      onChange={() => setError("")}
    >
      <div>
        <label htmlFor="firstname">
          Prénom <span>*</span>
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          autoComplete="firstname"
          required
        />
      </div>
      <div>
        <label htmlFor="name">
          Nom <span>*</span>
        </label>
        <input type="text" id="name" name="name" autoComplete="name" required />
      </div>
      <div>
        <label htmlFor="email">
          Email <span>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">
          Mot de passe <span>*</span>
        </label>
        <input
          type={seePswd ? "text" : "password"}
          id="password"
          name="password"
          autoComplete="new-password"
          required
        />
        <FontAwesomeIcon
          icon={seePswd ? faEyeSlash : faEye}
          onClick={() => setSeePswd(!seePswd)}
        />
      </div>
      <div>
        <label htmlFor="password_confirm">
          Confirmer le mot de passe <span>*</span>
        </label>
        <input
          type={seePswd ? "text" : "password"}
          id="password_confirm"
          autoComplete="new-password"
          required
        />
        <FontAwesomeIcon
          icon={seePswd ? faEyeSlash : faEye}
          onClick={() => setSeePswd(!seePswd)}
        />
      </div>
      <div>
        <label htmlFor="file">Photo de profil</label>
        <input type="file" accept="image/*" id="file" name="file" />
      </div>

      <button>Se connecter</button>
      {error && <p className={styles.error_msg}>{error}</p>}
    </form>
  );
}
