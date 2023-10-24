"use client";

import { API_GET_ARTICLES, API_GET_CATEGORYS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { addArticle } from "@/service/articleService";
import { Category } from "@/types/categoryTypes";
import { FormEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./adminarticle.module.scss";
import "../admin.scss";
import Image from "next/image";
import { Article } from "@/types/articleTypes";
import { handleDate } from "../../../../../utils/userUtils";
// from https://github.com/zenoamaro/react-quill/issues/122#issuecomment-560192943
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

function AdminArticles({ userId }: { userId: number }) {
  const [content, setContent] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [handleArticle, setHandleArticle] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>();
  const [categorys, setCategorys] = useState<Category[]>();

  useFetchData(setCategorys, API_GET_CATEGORYS);
  useFetchData(setArticles, API_GET_ARTICLES);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);
    formData.append("user_id", userId.toString());
    formData.append(
      "category_id",
      (e.currentTarget.elements as any).category.value
    );

    addArticle(formData, setMsg);
  };

  return (
    // <div className={styles.editor}>
    //   <h1>Ajouter un article</h1>
    //   <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
    //     <div className={styles.inputForm}>
    //       <label htmlFor="titleArticle">Titre</label>
    //       <input type="text" name="title" id="titleArticle" required />
    //     </div>
    //     <div className={styles.inputForm}>
    //       <label htmlFor="description">Description</label>
    //       <input type="text" name="description" id="description" required />
    //     </div>
    //     <div className={styles.inputForm}>
    //       <label htmlFor="file">Image de présentation</label>
    //       <input type="file" name="file" id="file" accept="image/*" required />
    //     </div>
    //     <div className={styles.inputForm}>
    //       <label htmlFor="category">Catégorie</label>
    //       <select name="category" id="category" required>
    //         {categorys?.map((category, i) => (
    //           <option key={i} value={category.id}>
    //             {category.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <ReactQuill
    //       theme="snow"
    //       value={content}
    //       modules={modules}
    //       onChange={setContent}
    //       placeholder="Ecris ton article ici"
    //     />
    //     <button className={styles.add_element}>Ajouter</button>
    //   </form>
    // </div>
    <div className="admin_container">
      <h1>Liste des catégories</h1>

      <table className="table">
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Date</th>
          <th>Description</th>
          <th>Contenu</th>
          <th>Catégorie</th>
        </tr> 
        {articles?.map((article, i) => (
          <tr key={i}>
            <td>{article.title}</td>
            <td>{article.user_id}</td>
            <td>{handleDate(article.date)}</td>
            <td className={styles.long_content}>{article.description}</td>
            <td className={styles.long_content}>{article.content}</td>
            <td>{article.category_id}</td>
          </tr>
        ))}
      </table>

      <button className="add_element" onClick={() => setHandleArticle(true)}>
        + Ajouter un article
      </button>
    </div>
  );
}

export default AdminArticles;

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};
