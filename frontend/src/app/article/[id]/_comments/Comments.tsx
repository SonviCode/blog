import { API_GET_COMMENTS } from "@/constants/constants";
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

function Comments() {
  const [comments, setComments] = useState<Comment[]>();
  const [msg, setMsg] = useState<string>("");

  const user: User | null = useSelector((state: RootState) => state.user.value);

  useCheckCookies();

  useFetchData(setComments, API_GET_COMMENTS);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addComment(formData, setMsg);
  };

  return (
    <div>
      <h3>Commentaires</h3>
      {user && (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <textarea placeholder="Ajouter un commentaire"></textarea>
          <button>Ajouter</button>
        </form>
      )}
      <div>
        {comments && comments.length > 0 ? (
          comments.map((comment, i) => (
            <div key={i}>
              <div className={styles.user_container}>
                <Image
                  className={styles.img_user}
                  src={comment.user.imgUser!}
                  alt={comment.user.name}
                  width={50}
                  height={50}
                />
                <div>
                  <p>{comment.user.name}</p>
                  <p className={styles.date}>{handleDate(comment.date)}</p>
                </div>
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
