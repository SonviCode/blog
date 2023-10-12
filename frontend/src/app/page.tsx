"use client";

import Aside from "@/components/Aside/Aside";
import CategoryList from "@/components/CategoryList/CategoryList";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./home.module.scss";
import { API_GET_ARTICLES, PITCH_PRESENTATION } from "@/constants/constants";
import { Article } from "@/types/articleTypes";

const listArticles = [
  {
    id: 1,
    date: "2023-08-12",
    title: "Test",
    img: "/IMG_1371.JPG",
    user: "tom sonvico",
    content: "blablablalbalbalblal",
    category: "montagne",
  },
  {
    id: 2,
    date: "2020-05-10",
    title: "La traversée des Vosges",
    img: "/IMG_1371.JPG",
    user: "tom sonvico",
    content: "blablablalbalbalblal",
    category: "montagne",
  },
];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>();

  useFetchData(setArticles, API_GET_ARTICLES);

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
          />
        </div>
        <div className={styles.presentation_text}>
          <p>{PITCH_PRESENTATION}</p>
        </div>
      </section>
      <h2>Catégorie</h2>
      <CategoryList />
      <h2>Articles récents</h2>
      <div className="container_aside">
        <section className="section_aside_left">
          {articles?.map((article, i) => (
            <div key={i} className={styles.article}>
              <div className={styles.container_img}>
                {/* <Image src={article.img} alt={article.title} fill={true} /> */}
              </div>
              <div className={styles.article_info}>
                <p>{/* {article.date} - {article.category} */}</p>
                <h1>{article.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                <Link href={`/article/${article.id}`}>Lire plus</Link>
              </div>
            </div>
          ))}
        </section>
        <Aside />
      </div>
    </main>
  );
}
