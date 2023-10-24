import { API_GET_COMMENTS, COMMENT_EMPTY } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { RootState } from "@/redux/store";
import { addComment } from "@/service/commentService";
import { Comment } from "@/types/commentTypes";
import { User } from "@/types/userTypes";
import React, { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./comments.module.scss";
import useCheckCookies from "@/hooks/useCheckCookies";
import Image from "next/image";
import { handleDate } from "@/utils/userUtils";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editComment, setEditComment] = useState<Comment>();
  const [msg, setMsg] = useState<string>("");

  const user: User | null = useSelector((state: RootState) => state.user.value);

  const pathname = usePathname();
  const articleId = pathname.split("/")[2];

  useCheckCookies();

  useFetchData(setComments, `${API_GET_COMMENTS}/${articleId}`);

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      (
        e.currentTarget.elements as unknown as HTMLFormElement
      ).content.value.trim() === ""
    ) {
      setMsg(COMMENT_EMPTY);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("user_id", user?.id.toString()!);
    formData.append("article_id", articleId);

    addComment(formData, setMsg, setComments);
  };

  return (
    <div>
      <h3 className={styles.title}>Commentaires</h3>
      {user && (
        <>
          {msg && <p className="error_msg">{msg}</p>}
          <form
            encType="multipart/form-data"
            className={styles.form}
            onSubmit={(e) => handleAddComment(e)}
          >
            <textarea
              name="content"
              id="content"
              placeholder="Ajouter un commentaire"
              onChange={() => setMsg("")}
              required
            />
            <button>Ajouter</button>
          </form>
        </>
      )}
      <div className={styles.comment_container}>
        {comments && comments.length > 0 ? (
          comments.map((comment, i) => (
            <div
              key={i}
              className={
                editComment?.id === comment.id ? styles.edit_comment : ""
              }
            >
              <div className={styles.user_container}>
                {/* <Image
                  className={styles.img_user}
                  src={comment.user.imgUser!}
                  alt={comment.user.name}
                  width={50}
                  height={50}
                /> */}
                <div>
                  <p>{comment.user_id}</p>
                  <p className={styles.date}>{handleDate(comment.date)}</p>
                  {editComment?.id === comment.id ? (
                    <form className={styles.edit_form}>
                      <textarea
                        name="content"
                        id="content"
                        defaultValue={comment.content}
                        required
                      />
                    </form>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                </div>
                {user?.id === comment.user_id && (
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={styles.edit_logo}
                    onClick={() => setEditComment(comment)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Aucun commentaire pour le moment !</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
