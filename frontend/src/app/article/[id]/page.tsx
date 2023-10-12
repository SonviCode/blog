"use client";

import Aside from "@/components/Aside/Aside";
import { API_GET_ARTICLES } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Article } from "@/types/articleTypes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./article.module.scss";
import Error from "next/error";

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
  const [article, setArticle] = useState<Article>();
  const pathname = usePathname();

  useFetchData(setArticle, `${API_GET_ARTICLES}/${pathname.split("/")[2]}`);

  if (!article) return <Error statusCode={404} />;

  return (
    <main>
      <article className={styles.container_title}>
        <div className={styles.info_title}>
          <h1>{article.title}</h1>
          <div>
            <p>{article.user_id}</p>
          </div>
        </div>
        <div>
          {/* <Image
            src={article.img}
            alt={article.title}
            width={400}
            height={200}
          /> */}
        </div>
      </article>

      <div className="container_aside">
        <section className="section_aside_left">
          <h2>titre contenu</h2>
          {/* <>{html.body}</> */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </section>
        <Aside />
      </div>
    </main>
  );
}

// TODO HERE : GET ARTICLE BY ID FROM URL
