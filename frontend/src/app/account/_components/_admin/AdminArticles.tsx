import { API_ADD_ARTICLE } from "@/constants/constants";
import { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AdminArticles({ userId }: { userId: number }) {
  const [content, setContent] = useState("");

  console.log(content);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as unknown as HTMLFormElement;
    const title = elements.titleArticle.value;

    fetch(API_ADD_ARTICLE, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author: userId, title, content }),
      //   body: JSON.stringify({ value }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json.message))
      .catch((error: any) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="titleArticle">Titre</label>
        <input type="text" name="title" id="titleArticle" />
        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          onChange={setContent}
          placeholder="Ecris ton article ici"
        />
        <button>Ajouter</button>
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
