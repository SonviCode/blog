import {
  API_GET_COMMENTS,
  COMMENT_EMPTY,
  alertTextDeleteComment,
} from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { RootState } from "@/redux/store";
import { addComment } from "@/service/commentService";
import { Comment } from "@/types/commentTypes";
import { User } from "@/types/userTypes";
import { handleDate } from "@/utils/userUtils";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./comments.module.scss";
import ConfirmModal from "@/components/Modal/ConfirmModal/ConfirmModal";
import Image from "next/image";

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const user: User | null = useSelector((state: RootState) => state.user.value);

  const pathname = usePathname();
  const articleId = pathname.split("/")[2];

  useFetchData(setComments, `${API_GET_COMMENTS}/${articleId}`);

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
    formData.append("article_id", articleId);

    addComment(formData, setError, setComments);
  };

  return (
    <div>
      <h3>Commentaires</h3>
      {user && (
        <>
          {error && <p className="error_msg">{error}</p>}
          <form
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
                    src={"/IMG_1371.JPG"}
                    alt={comment.user_id.toString()}
                    width={50}
                    height={50}
                  />
                  <div>
                    <p>{comment.user_id}</p>
                    <p className={styles.date}>{handleDate(comment.date)}</p>
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
              {user?.id === comment.user_id && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.delete_logo}
                  onClick={() => setIsOpenModal(true)}
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
    </div>
  );
}

export default Comments;
