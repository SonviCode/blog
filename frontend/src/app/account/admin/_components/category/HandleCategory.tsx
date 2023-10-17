import { addCategory } from "@/service/categoryService";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import "../admin.scss";
import styles from "./admincategory.module.scss";

function HandleCategory({
  setHandleCategory,
}: {
  setHandleCategory: Dispatch<SetStateAction<boolean>>;
}) {
  const [msg, setMsg] = useState<string>("");
  const [success, setSucces] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addCategory(formData, setMsg, setSucces);

    setHandleCategory(false);
  };

  return (
    <form
      encType="multipart/form-data"
      ref={form}
      onSubmit={(e) => handleSubmit(e)}
      className={styles.form}
    >
      <h1>Ajouter une catégorie</h1>
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
        <input type="file" accept="image/*" id="file" name="file" required />
      </div>

      <button>Ajouter</button>
      <div className="cancel_btn" onClick={() => setHandleCategory(false)}>
        Annuler
      </div>
      {msg && (
        <p className={success ? styles.succes_msg : styles.error_msg}>{msg}</p>
      )}
    </form>
  );
}

export default HandleCategory;
