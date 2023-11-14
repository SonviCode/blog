import {
  API_COMMENT,
  COMMENT_EMPTY,
  alertTextDeleteComment,
} from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { RootState } from "@/redux/store";
import {
  addComment,
  deleteComment,
  getComments,
} from "@/service/commentService";
import { Comment } from "@/types/commentTypes";
import { User } from "@/types/userTypes";
import { handleDate } from "@/utils/userUtils";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { FormEvent, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./comments.module.scss";
import ConfirmModal from "@/components/Modal/ConfirmModal/ConfirmModal";
import Image from "next/image";

function Comments() {
  const [comments, setComments] = useState<any[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  console.log(comments);

  const user: User | null = useSelector((state: RootState) => state.user.value);

  const form = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const article_id = pathname.split("/")[2];

  useFetchData(setComments, `${API_COMMENT}/${article_id}`);

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      (
        e.currentTarget.elements as unknown as HTMLFormElement
      ).content.value.trim() === ""
    ) {
      setError(COMMENT_EMPTY);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("user_id", user?.id.toString()!);
    formData.append("article_id", article_id);

    addComment(formData, setError);
    getComments(article_id, setComments);

    form.current!.reset();
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id, setError);
    getComments(article_id, setComments);
  };

  return (
    <section className={styles.comment_section}>
      <h3>Commentaires</h3>
      {user && (
        <>
          {error && <p className="error_msg">{error}</p>}
          <form
            ref={form}
            encType="multipart/form-data"
            className={styles.form}
            onSubmit={(e) => handleAddComment(e)}
          >
            <textarea
              name="content"
              id="content"
              placeholder="Ajouter un commentaire"
              onChange={() => setError("")}
              required
            />
            <button>Ajouter</button>
          </form>
        </>
      )}
      <div className={styles.comment_container}>
        {comments && comments.length > 0 ? (
          comments.map((comment, i) => (
            <div key={i} className={styles.comment}>
              <div className={styles.user_container}>
                <div className={styles.user_info}>
                  <Image
                    className={styles.img_user}
                    // src={comment.}
                    src={
                      comment.user_img ? comment.user_img : "/no-user-image.jpg"
                    }
                    alt={comment.user_id.toString()}
                    width={50}
                    height={50}
                  />
                  <div>
                    <p>{comment.user_name}</p>
                    <p className={styles.date}>{handleDate(comment.date)}</p>
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
              {user?.id === comment.user_id && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.delete_logo}
                  onClick={() => handleDeleteComment(comment.id)}
                  // onClick={() => setIsOpenModal(true)}
                />
              )}
            </div>
          ))
        ) : (
          <div>
            <p>Aucun commentaire pour le moment !</p>
          </div>
        )}
      </div>
      {isOpenModal && (
        <ConfirmModal
          setIsOpenModal={setIsOpenModal}
          alertText={alertTextDeleteComment}
        />
      )}
    </section>
  );
}

export default Comments;
