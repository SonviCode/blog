"use client";

import { INPUT_EMPTY } from "@/constants/constants";
import { fetchLogin } from "@/service/userService";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import styles from "./auth.module.scss";

export default function Login() {
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

    fetchLogin(email, password, setMsg);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={() => setMsg("")} type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          onChange={() => setMsg("")}
          type={seePswd ? "text" : "password"}
          id="password"
          required
          autoComplete="current-password"
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
