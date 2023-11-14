"use client";

import ArticleList from "@/components/ArticleList/ArticleList";
import Aside from "@/components/Aside/Aside";
import CategoryList from "@/components/CategoryList/CategoryList";
import { PITCH_PRESENTATION } from "@/constants/constants";
import Image from "next/image";
import styles from "./home.module.scss";

export default function Home() {

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>
        <span>Hey, C&apos;est Tom !</span> Retrouve ici mes histoires, mes
        idées, mes projets...
      </h2>
      <section className={styles.presentation}>
        <div className={styles.presentation_img}>
          <Image
            src="/presentation.jpg"
            alt="photo de Tom dans les Pyrénées"
            fill={true}
            sizes="100 vw"
          />
        </div>
        <div className={styles.presentation_text}>
          <p>{PITCH_PRESENTATION}</p>
        </div>
      </section>
      <h2>Catégorie</h2>

      <CategoryList />

      <div className="container_aside">
        <section className="section_aside_left">
          <h2>Articles récents</h2>
          <ArticleList />
        </section>
        <Aside />
      </div>
    </main>
  );
}
