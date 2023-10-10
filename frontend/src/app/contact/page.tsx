import React from "react";
import styles from "./contact.module.scss";
import Image from "next/image";

export default function Contact() {
  return (
    <main>
      <div className={styles.container_img}>
        <Image src="/IMG_1371.JPG" alt="Tom contact" fill={true} />
      </div>
      <h1 className={styles.title}>Mes projets te plaisent ?</h1>
      <ul className={styles.list_contact}>
        <li>
          👉 Voici mon site portfolio de développeur :{" "}
          <a
            className={styles.website}
            href="https://www.tom-sonvico.fr/"
            target="blank"
          >
            https://www.tom-sonvico.fr/
          </a>
        </li>
        <li>
          👉 Ou sinon tu peux me contacter via Linkedin :{" "}
          <a
            className={styles.website}
            href="https://www.linkedin.com/in/tom-sonvico/"
            target="blank"
          >
            https://www.linkedin.com/in/tom-sonvico/
          </a>
        </li>
      </ul>
    </main>
  );
}
