import { API_GET_CATEGORYS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { addCategory } from "@/service/categoryService";
import { Category } from "@/types/categoryTypes";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import styles from "./admin.module.scss";
import ModalEdit from "./ModalEdit";

function AdminCategory() {
  const [msg, setMsg] = useState<string>("");
  const [success, setSucces] = useState<boolean>(false);
  const [handleCategory, setHandleCategory] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [categorys, setCategorys] = useState<Category[]>();
  const form = useRef<HTMLFormElement>(null);

  useFetchData(setCategorys, API_GET_CATEGORYS);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addCategory(formData, setMsg, setSucces);

    setHandleCategory(false);
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
          <div
            className={styles.cancel_btn}
            onClick={() => setHandleCategory(false)}
          >
            Annuler
          </div>
          {msg && (
            <p className={success ? styles.succes_msg : styles.error_msg}>
              {msg}
            </p>
          )}
        </form>
      ) : (
        <>
          <ul className={styles.category}>
            {categorys?.map((category, i) => (
              <li
                key={i}
                style={{ background: category.color }}
                onClick={() => setShowModal(!showModal)}
              >
                <Image
                  src={category.imgUrl}
                  alt={category.name}
                  width={20}
                  height={20}
                />
                <p>{category.name}</p>
              </li>
            ))}
          </ul>
          {showModal && <ModalEdit />}
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
