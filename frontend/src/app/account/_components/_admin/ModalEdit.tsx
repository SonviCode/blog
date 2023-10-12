import { useState } from "react";
import styles from "./admin.module.scss";

function ModalEdit() {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  return (
    <div className={styles.modal}>
      <div onClick={() => setShowConfirmModal(!showConfirmModal)}>
        <p>Supprimer</p>
      </div>
      {showConfirmModal && (
        <div className={styles.confirm_modal}>
          <p>Etes-vous sûr de vouloir supprimer cette catégorie ?</p>
          <button>Oui</button>
          <button>Non</button>
        </div>
      )}
      <div>
        <p>Modifier</p>
      </div>
    </div>
  );
}

export default ModalEdit;
