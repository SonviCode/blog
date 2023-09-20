import styles from "./auth.module.scss";

export default function Login() {
  return (
    <form className={styles.login}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="pswd">Mot de passe</label>
        <input type="password" id="pswd" required />
      </div>

      <button>Se connecter</button>
    </form>
  );
}
