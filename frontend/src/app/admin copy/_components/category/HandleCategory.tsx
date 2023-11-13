import { addCategory, updateCategory } from "@/service/categoryService";
import { Category } from "@/types/categoryTypes";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "../admin.scss";
import styles from "./admincategory.module.scss";

function HandleCategory({
  setHandleCategory,
  setCategorys,
  defaultValue,
}: HandleCategoryProps) {
  const [error, setError] = useState<string>("");
  const [updateImg, setUpdateImg] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (defaultValue) {
      updateCategory(defaultValue.id, formData, setError, setCategorys);
    } else {
      addCategory(formData, setError, setCategorys);
    }

    setHandleCategory(false);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => handleSubmit(e)}
      className={styles.form}
    >
      <div>
        <div
          id="cancel_btn"
          onClick={() => {
            setHandleCategory(false);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>Annuler</p>
        </div>
        <h1>Ajouter une catégorie</h1>
      </div>
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
        {!defaultValue || updateImg ? (
          <input type="file" accept="image/*" id="file" name="file" required />
        ) : (
          <div className={styles.img_update}>
            <Image
              src={defaultValue?.imgUrl}
              alt={defaultValue?.name}
              width={30}
              height={30}
            />
            <button type="button" onClick={() => setUpdateImg(true)}>
              Changer l&apos;image
            </button>
          </div>
        )}
      </div>

      <button>{defaultValue ? "Mettre à jour" : "Ajouter"}</button>

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
