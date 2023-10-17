import React from "react";
import styles from './confirmModal.module.scss'

function ConfirmModal() {
  return (
    <div className={styles.confirm_modal}>
      <h4>Etes-vous sûr de vouloir supprimer cette catégorie ?</h4>
    </div>
  );
}

export default ConfirmModal;
