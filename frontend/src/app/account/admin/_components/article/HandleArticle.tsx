import React, {
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import styles from "./adminarticle.module.scss";
import {
  addArticle,
  getArticles,
  updateArticle,
} from "@/service/articleService";
import { User } from "@/types/userTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useFetchData from "@/hooks/useFetchData";
import { API_CATEGORY } from "@/constants/constants";
import { Category } from "@/types/categoryTypes";
import { Article } from "@/types/articleTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// from https://github.com/zenoamaro/react-quill/issues/122#issuecomment-560192943
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

function HandleArticle({
  setHandleArticle,
  setArticles,
  defaultValue,
}: HanldeArticleProps) {
  const [content, setContent] = useState<string>(defaultValue?.content!);
  const [error, setError] = useState<string>("");
  const [categorys, setCategorys] = useState<Category[]>();
  const [updateImg, setUpdateImg] = useState<boolean>(false);

  useFetchData(setCategorys, API_CATEGORY);

  const user: User | null = useSelector((state: RootState) => state.user.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);
    formData.append("user_id", user!.id.toString());

    let success = true;

    if (defaultValue) {
      success = await updateArticle(defaultValue.id, formData, setError);
    } else {
      success = await addArticle(formData, setError);
    }

    if (success) {
      getArticles(setArticles);
      setHandleArticle(false);
    }
  };

  return (
    <form
      className={styles.form}
      encType="multipart/form-data"
      onSubmit={(e) => handleSubmit(e)}
      onChange={() => setError("")}
    >
      <div>
        <div
          id="cancel_btn"
          onClick={() => {
            setHandleArticle(false);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>Annuler</p>
        </div>
        <h1>Ajouter un article</h1>
      </div>
      <div className={styles.inputForm}>
        <label htmlFor="titleArticle">Titre</label>
        <input
          type="text"
          name="title"
          id="titleArticle"
          required
          defaultValue={defaultValue?.title}
        />
      </div>
      <div className={styles.inputForm}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          required
          defaultValue={defaultValue?.description}
        />
      </div>
      <div className={styles.inputForm}>
        <label htmlFor="file">Image de présentation</label>
        {defaultValue == undefined || updateImg ? (
          <input type="file" accept="image/*" id="file" name="file" required />
        ) : (
          <div className={styles.img_update}>
            <Image
              src={defaultValue?.imagePresentation!}
              alt={defaultValue?.title!}
              width={30}
              height={30}
            />
            <button type="button" onClick={() => setUpdateImg(true)}>
              Changer l&apos;image
            </button>
          </div>
        )}
      </div>
      <div className={styles.inputForm}>
        <label htmlFor="category">Catégorie</label>
        <select
          name="category_id"
          id="category"
          required
          defaultValue={defaultValue?.category_id}
        >
          {categorys?.map((category, i) => (
            <option
              key={i}
              value={category.id}
              // selected={defaultValue?.category_id == category.id}
            >
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
      <button className="add_element">
        {defaultValue ? "Mettre à jour" : "Ajouter"}
      </button>
      {error && <p className="error_msg">{error}</p>}
    </form>
  );
}

export default HandleArticle;

type HanldeArticleProps = {
  setHandleArticle: Dispatch<SetStateAction<boolean>>;
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
