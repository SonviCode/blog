import { addCategory } from "@/service/categoryService";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import "../admin.scss";
import styles from "./admincategory.module.scss";
import { Category } from "@/types/categoryTypes";

function HandleCategory({
  setHandleCategory,
  defaultValue,
  setDefaultValue,
}: {
  setHandleCategory: Dispatch<SetStateAction<boolean>>;
  defaultValue?: Category;
  setDefaultValue?: Dispatch<SetStateAction<Category | undefined>>;
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
        <input
          type="text"
          id="nameCategory"
          name="name"
          required
          defaultValue={defaultValue?.name}
        />
      </div>
      <div>
        <label htmlFor="color">Couleur</label>
        <input
          type="text"
          id="color"
          name="color"
          required
          defaultValue={defaultValue?.color}
        />
      </div>
      <div>
        <label htmlFor="file">Image</label>
        <input type="file" accept="image/*" id="file" name="file" required />
        {defaultValue && <p>{defaultValue.imgUrl}</p>}
      </div>

      <button>Ajouter</button>
      <div
        className="cancel_btn"
        onClick={() => {
          setHandleCategory(false);
          setDefaultValue!(undefined);
        }}
      >
        Annuler
      </div>
      {msg && (
        <p className={success ? styles.succes_msg : styles.error_msg}>{msg}</p>
      )}
    </form>
  );
}

export default HandleCategory;
