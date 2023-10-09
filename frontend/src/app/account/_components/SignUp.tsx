import { API_SIGNUP, INPUT_EMPTY } from "@/constants/constants";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import styles from "./auth.module.scss";
import { fetchSignUp } from "@/service/userService";

export default function SignUp() {
  const [msg, setMsg] = useState<string>("");
  const [seePswd, setSeePswd] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as unknown as HTMLFormElement;
    const email: string = elements.email.value;
    const password: string = elements.password.value;

    if (email.trim() == "" || password.trim() == "") {
      setMsg(INPUT_EMPTY);
    }

    fetchSignUp(email, password, setMsg);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <div>
        <label htmlFor="firstname">Prénom</label>
        <input type="text" id="firstname" required />
      </div>
      <div>
        <label htmlFor="name">Nom</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type={seePswd ? "text" : "password"}
          id="password"
          autoComplete="new-password"
          required
        />
        <FontAwesomeIcon
          icon={seePswd ? faEyeSlash : faEye}
          onClick={() => setSeePswd(!seePswd)}
        />
      </div>
      <div>
        <label htmlFor="password_confirm">Confirmer le mot de passe</label>
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

      <button>Se connecter</button>
      {msg && <p className={styles.error_msg}>{msg}</p>}
    </form>
  );
}
