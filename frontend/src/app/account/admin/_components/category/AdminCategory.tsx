import { API_GET_CATEGORYS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { addCategory, deleteCategory } from "@/service/categoryService";
import { Category } from "@/types/categoryTypes";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import "../admin.scss";
import styles from "./admincategory.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "@/components/Modal/ConfirmModal/ConfirmModal";
import HandleCategory from "./HandleCategory";

function AdminCategory() {
  const [handleCategory, setHandleCategory] = useState<boolean>(false);
  const [categorys, setCategorys] = useState<Category[]>();

  useFetchData(setCategorys, API_GET_CATEGORYS);

  const handleDelete = (id: number) => {
    deleteCategory(id);
    return <ConfirmModal />;
  };

  const handleEdit = (category: Category) => {
    console.log(category);

    return <ConfirmModal />;
  };

  if (handleCategory) {
    return <HandleCategory setHandleCategory={setHandleCategory} />;
  }

  return (
    <div className="admin_container">
      <h1>Liste des catégories</h1>

      <table className="table">
        <tr>
          <th>Nom</th>
          <th>Color</th>
          <th>Image</th>
        </tr>
        {categorys?.map((category, i) => (
          <tr key={i}>
            <td>{category.name}</td>
            <td>{category.color}</td>
            <td className="td_img">
              <Image
                src={category.imgUrl}
                alt={category.name}
                width={20}
                height={20}
              />
            </td>
            <div className="icon_container">
              <div
                className="icon_handle trash"
                onClick={() => handleDelete(category.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
              <div className="icon_handle" onClick={() => handleEdit(category)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </div>
          </tr>
        ))}
      </table>

      <button className="add_element" onClick={() => setHandleCategory(true)}>
        + Ajouter une catégorie
      </button>
    </div>
  );
}

export default AdminCategory;
