"use client";

import { useState } from "react";
import styles from "./auth.module.scss";
import SignUp from "@/app/account/_components/_auth/SignUp";
import Login from "@/app/account/_components/_auth/Login";

export default function ConnectModal() {
  const [signUp, setSignUp] = useState(true);

  console.log("test");

  return (
    <div className={styles.auth_container}>
      <div className={styles.btn_container}>
        <button
          className={signUp ? styles.is_active : ""}
          onClick={() => setSignUp(true)}
        >
          S&apos;inscrire
        </button>
        <button
          className={!signUp ? styles.is_active : ""}
          onClick={() => setSignUp(false)}
        >
          Se connecter
        </button>
      </div>
      {signUp ? <SignUp /> : <Login />}
    </div>
  );
}
