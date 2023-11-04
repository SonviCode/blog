import { addCategory, updateCategory } from "@/service/categoryService";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import "../admin.scss";
import styles from "./admincategory.module.scss";
import { Category } from "@/types/categoryTypes";

function HandleCategory({
  setHandleCategory,
  setCategorys,
  defaultValue,
}: HandleCategoryProps) {
  const [error, setError] = useState<string>("");
  const form = useRef<HTMLFormElement>(null);

  console.log(defaultValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (defaultValue) {
      updateCategory(1, setError, setCategorys);
    } else {
      addCategory(formData, setError, setCategorys);
    }

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
        }}
      >
        Annuler
      </div>
      {error && <p className={styles.error_msg}>{error}</p>}
    </form>
  );
}

export default HandleCategory;

type HandleCategoryProps = {
  setHandleCategory: Dispatch<SetStateAction<boolean>>;
  setCategorys: Dispatch<SetStateAction<Category[]>>;
  defaultValue?: Category;
};
