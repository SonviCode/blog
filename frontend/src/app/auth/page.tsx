"use client";

import { useState } from "react";
import styles from "./auth.module.scss";
import SignUp from "@/components/auth/SignUp";
import Login from "@/components/auth/Login";

export default function Auth() {
  const [signUp, setSignUp] = useState(true);

  return (
    <main className={styles.main}>
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
    </main>
  );
}
