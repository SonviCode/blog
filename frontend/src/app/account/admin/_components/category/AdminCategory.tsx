import ConfirmModal from "@/components/Modal/ConfirmModal/ConfirmModal";
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
import useFetchCategorys from "@/hooks/fetch/useFetchCategorys";

function AdminCategory() {
  const [handleCategory, setHandleCategory] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<Category>();

  const categorys = useFetchCategorys();

  const handleDelete = (id: number) => {
    deleteCategory(id);
    return <ConfirmModal />;
  };

  const handleEdit = (category: Category) => {
    console.log(category);

    setDefaultValue(category);
    setHandleCategory(true);
  };

  if (handleCategory) {
    return (
      <HandleCategory
        setHandleCategory={setHandleCategory}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
      />
    );
  }

  return (
    <div className="admin_container">
      <h1>Liste des catégories</h1>

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
              <td>{category.color}</td>
              <td className="td_img">
                <Image
                  src={category.imgUrl}
                  alt={category.name}
                  width={20}
                  height={20}
                />
              </td>
              <td className="icon_handle trash">
                <FontAwesomeIcon icon={faTrash} />
              </td>
              <td className="icon_handle" onClick={() => handleEdit(category)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add_element" onClick={() => setHandleCategory(true)}>
        + Ajouter une catégorie
      </button>
    </div>
  );
}

export default AdminCategory;
