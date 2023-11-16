import { SetStateAction, Dispatch } from "react";
import styles from "./confirmModal.module.scss";

function ConfirmModal({
  setIsOpenModal,
  alertText,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  alertText: string;
}) {
  return (
    <div className={styles.confirm_modal}>
      <h4>{alertText}</h4>
      <div className={styles.button_container}>
        <button className={styles.cancel} onClick={() => setIsOpenModal(false)}>
          Annuler
        </button>
        <button className={styles.confirm}>Confirmer</button>
      </div>
    </div>
  );
}

export default ConfirmModal;

//TODO