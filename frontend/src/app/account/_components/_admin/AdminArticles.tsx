"use client";

import { addArticle } from "@/service/articleService";
import { FormEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./admin.module.scss";
// from https://github.com/zenoamaro/react-quill/issues/122#issuecomment-560192943
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

function AdminArticles({ userId }: { userId: number }) {
  const [content, setContent] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);
    formData.append("user_id", userId.toString());

    addArticle(formData, setMsg);
  };

  return (
    <div className={styles.editor}>
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
          <label htmlFor="img">Image de présentation</label>
          <input
            type="file"
            name="imagePresentation"
            id="img"
            accept="image/*"
            required
          />
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          onChange={setContent}
          placeholder="Ecris ton article ici"
        />
        <button className={styles.add_element}>Ajouter</button>
      </form>
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
