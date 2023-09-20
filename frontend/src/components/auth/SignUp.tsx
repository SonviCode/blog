import styles from "./auth.module.scss";

export default function SignUp() {
  return (
    <form className={styles.login}>
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
        <label htmlFor="pswd">Mot de passe</label>
        <input type="password" id="pswd" required />
      </div>
      <div>
        <label htmlFor="pswd_confirm">Confirmer le mot de passe</label>
        <input type="password" id="pswd_confirm" required />
      </div>

      <button>Se connecter</button>
    </form>
  );
}
