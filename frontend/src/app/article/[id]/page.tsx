"use client";

import Aside from "@/components/Aside/Aside";
import Image from "next/image";
import styles from "./article.module.scss";

const article = {
  id: 1,
  date: "2023-08-12",
  title: "Test",
  img: "/IMG_1371.JPG",
  user: "tom sonvico",
  content: "blablablalbalbalblal",
  category: "montagne",
};

export default function Article() {
  return (
    <main>
      <div className={styles.container_title}>
        <div className={styles.info_title}>
          <h1>{article.title}</h1>
          <div>
            <p>{article.user}</p>
          </div>
        </div>
        <div>
          <Image
            src={article.img}
            alt={article.title}
            width={400}
            height={200}
          />
        </div>
      </div>

      <div className="container_aside">
        <section className="section_aside_left">
          <h2>titre contenu</h2>
          <p>{article.content}</p>
        </section>
        <Aside />
      </div>
    </main>
  );
}

// TODO HERE : GET ARTICLE BY ID FROM URL
