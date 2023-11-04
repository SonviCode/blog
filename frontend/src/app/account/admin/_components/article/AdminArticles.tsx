"use client";

import { API_GET_ARTICLES } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Article } from "@/types/articleTypes";
import { Category } from "@/types/categoryTypes";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { handleDate } from "../../../../../utils/userUtils";
import "../admin.scss";
import styles from "./adminarticle.module.scss";
import HandleArticle from "./HandleArticle";

function AdminArticles() {
  const [handling, setHandling] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [defaultValue, setDefaultValue] = useState<Article>();

  useFetchData(setArticles, API_GET_ARTICLES);

  const handleAdd = (): void => {
    setDefaultValue(undefined);
    setHandling(true);
  };

  // const handleDelete = (id: number) => {
  //   deleteCategory(id, setCategorys);
  // };

  // const handleEdit = (category: Category): void => {
  //   setDefaultValue(category);
  //   setHandling(true);
  // };

  if (handling)
    return (
      <HandleArticle
        setHandleCategory={setHandling}
        setArticles={setArticles}
        defaultValue={defaultValue}
      />
    );

  return (
    <div className="admin_container">
      <h1>Liste des catégories</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Date</th>
            <th>Description</th>
            <th>Contenu</th>
            <th>Catégorie</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>

      <button className="add_element" onClick={() => handleAdd()}>
        + Ajouter un article
      </button>
    </div>
  );
}

export default AdminArticles;
