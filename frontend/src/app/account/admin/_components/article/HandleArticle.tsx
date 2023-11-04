import React, { useState, FormEvent, Dispatch, SetStateAction } from "react";
import styles from "./adminarticle.module.scss";
import { addArticle } from "@/service/articleService";
import { User } from "@/types/userTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useFetchData from "@/hooks/useFetchData";
import { API_GET_CATEGORYS } from "@/constants/constants";
import { Category } from "@/types/categoryTypes";
import { Article } from "@/types/articleTypes";

// from https://github.com/zenoamaro/react-quill/issues/122#issuecomment-560192943
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

function HandleArticle({
  setHandleCategory,
  setArticles,
  defaultValue,
}: HanldeArticleProps) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [categorys, setCategorys] = useState<Category[]>();

  useFetchData(setCategorys, API_GET_CATEGORYS);

  const user: User | null = useSelector((state: RootState) => state.user.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);
    formData.append("user_id", user!.id.toString());
    formData.append(
      "category_id",
      (e.currentTarget.elements as any).category.value
    );

    addArticle(formData, setError);
  };

  return (
    <div className={styles.editor}>
      <h1>Ajouter un article</h1>
      <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.inputForm}>
          <label htmlFor="titleArticle">Titre</label>
          <input type="text" name="title" id="titleArticle" required />
        </div>
        <div className={styles.inputForm}>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" required />
        </div>
        <div className={styles.inputForm}>
          <label htmlFor="file">Image de présentation</label>
          <input type="file" name="file" id="file" accept="image/*" required />
        </div>
        <div className={styles.inputForm}>
          <label htmlFor="category">Catégorie</label>
          <select name="category" id="category" required>
            {categorys?.map((category, i) => (
              <option key={i} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          onChange={setContent}
          placeholder="Ecris ton article ici"
        />
        <button className="add_element">Ajouter</button>
      </form>
    </div>
  );
}

export default HandleArticle;

type HanldeArticleProps = {
  setHandleCategory: Dispatch<SetStateAction<boolean>>;
  setArticles: Dispatch<SetStateAction<Article[]>>;
  defaultValue?: Article;
};

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
