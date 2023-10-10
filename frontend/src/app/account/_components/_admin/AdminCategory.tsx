import { addCategory } from "@/service/categoryService";
import React, { FormEvent, useRef, useState } from "react";
import styles from "./admin.module.scss";
import CategoryList from "@/components/CategoryList/CategoryList";

function AdminCategory() {
  const [msg, setMsg] = useState<string>("");
  const [handleCategory, setHandleCategory] = useState<boolean>(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addCategory(formData, setMsg);
  };

  return (
    <div className={styles.handle_container}>
      {handleCategory ? (
        <form
          encType="multipart/form-data"
          ref={form}
          onSubmit={(e) => handleSubmit(e)}
          className={styles.form}
        >
          <h2>Ajouter une catégorie</h2>
          <div>
            <label htmlFor="nameCategory">Nom</label>
            <input type="text" id="nameCategory" name="name" required />
          </div>
          <div>
            <label htmlFor="color">Couleur</label>
            <input type="text" id="color" name="color" required />
          </div>
          <div>
            <label htmlFor="file">Image</label>
            <input
              type="file"
              accept="image/*"
              id="file"
              name="file"
              required
            />
          </div>

          <button>Ajouter</button>
          <div className={styles.cancel_btn} onClick={() => setHandleCategory(false)}>Annuler</div>
          {msg && <p className={styles.error_msg}>{msg}</p>}
        </form>
      ) : (
        <>
          <CategoryList />
          <button
            className={styles.add_element}
            onClick={() => setHandleCategory(true)}
          >
            + Ajouter une catégorie
          </button>
        </>
      )}
    </div>
  );
}

export default AdminCategory;
