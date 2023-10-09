import React, { FormEvent, useState } from "react";
import styles from "./admin.module.scss";

function AdminAccount() {
  const [msg, setMsg] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as unknown as HTMLFormElement;
    const name = elements.nameCategory.value;
    const color = elements.color.value;
    const imgUrl = elements.imgUrl.value;
    
  };

  return (
    <div className={styles.admin_container}>
      <div>
        <h1>Compte administrateur</h1>
        <ul>
            <li>Catégorie</li>
            <li>Articles</li>
        </ul>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div>
          <label htmlFor="nameCategory">Nom</label>
          <input type="text" id="nameCategory" required />
        </div>
        <div>
          <label htmlFor="color">Couleur</label>
          <input type="text" id="color" required />
        </div>
        <div>
          <label htmlFor="imgUrl">Image</label>
          <input type="file" id="imgUrl" required />
        </div>

        <button>Ajouter</button>
        {msg && <p className={styles.error_msg}>{msg}</p>}
      </form>
    </div>
  );
}

export default AdminAccount;
