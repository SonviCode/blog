import { API_GET_CATEGORYS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { deleteCategory } from "@/service/categoryService";
import { Category } from "@/types/categoryTypes";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import "../admin.scss";
import HandleCategory from "./HandleCategory";
import styles from "./admincategory.module.scss";

function AdminCategory() {
  const [handling, setHandling] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<Category>();
  const [categorys, setCategorys] = useState<Category[]>([]);

  useFetchData(setCategorys, API_GET_CATEGORYS);

  const handleAdd = (): void => {
    setDefaultValue(undefined);
    setHandling(true);
  };

  const handleDelete = (id: number): void => {
    deleteCategory(id, setCategorys);
  };

  const handleEdit = (category: Category): void => {
    setDefaultValue(category);
    setHandling(true);
  };

  if (handling)
    return (
      <HandleCategory
        setHandleCategory={setHandling}
        setCategorys={setCategorys}
        defaultValue={defaultValue}
      />
    );

  return (
    <div className="admin_container">
      <h1>Liste des catégories</h1>

      <div className="table_container">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Color</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {categorys?.map((category, i) => (
              <tr key={i}>
                <td>{category.name}</td>
                <td>
                  <span
                    className={styles.color}
                    style={{ background: category.color }}
                  >
                    {category.color}
                  </span>
                </td>
                <td className="td_img">
                  <Image
                    src={category.imgUrl}
                    alt={category.name}
                    width={20}
                    height={20}
                  />
                </td>
                <td
                  className="icon_handle trash"
                  onClick={() => handleDelete(category.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </td>
                <td
                  className="icon_handle"
                  onClick={() => handleEdit(category)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add_element" onClick={() => handleAdd()}>
        + Ajouter une catégorie
      </button>
    </div>
  );
}

export default AdminCategory;
