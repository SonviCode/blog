"use client";

import { API_ARTICLE } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Article } from "@/types/articleTypes";
import { Category } from "@/types/categoryTypes";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { handleDate } from "../../../../../utils/userUtils";
import "../admin.scss";
import styles from "./adminarticle.module.scss";
import HandleArticle from "./HandleArticle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteArticle } from "@/service/articleService";

function AdminArticles() {
  const [handling, setHandling] = useState<boolean>(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [defaultValue, setDefaultValue] = useState<Article>();

  useFetchData(setArticles, API_ARTICLE);

  const handleAdd = (): void => {
    setDefaultValue(undefined);
    setHandling(true);
  };

  const handleDelete = (id: number): void => {
    deleteArticle(id, setArticles);
  };

  const handleEdit = (article: Article): void => {
    setDefaultValue(article);
    setHandling(true);
  };

  console.log(articles);

  if (handling)
    return (
      <HandleArticle
        setHandleArticle={setHandling}
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
            <th>Catégorie</th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((article, i) => (
            <tr key={i}>
              <td className={styles.long_content}>{article.title}</td>
              <td>{article.user_name}</td>
              <td>{handleDate(article.date)}</td>
              <td>
                <span
                  className={styles.category}
                  style={{ background: article.category_color }}
                >
                  {article.category_name}
                </span>
              </td>
              <td
                className="icon_handle trash"
                onClick={() => handleDelete(article.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </td>
              <td className="icon_handle" onClick={() => handleEdit(article)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </td>
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
