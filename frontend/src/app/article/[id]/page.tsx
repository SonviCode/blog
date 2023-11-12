"use client";

import Aside from "@/components/Aside/Aside";
import { API_ARTICLE } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Article } from "@/types/articleTypes";
import { handleDate } from "@/utils/userUtils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Comments from "./_comments/Comments";
import styles from "./article.module.scss";
import Error from "next/error";
import Loading from "@/app/loading";

export default function Article() {
  const [article, setArticle] = useState<any>();

  console.log(article);

  const pathname = usePathname();

  const isLoading = useFetchData(
    setArticle,
    `${API_ARTICLE}/${pathname.split("/")[2]}`
  );

  if (isLoading) return <Loading />;
  if (!article) return <Error statusCode={404} />;

  return (
    <main>
      <div className={styles.container_title}>
        <div className={styles.info_title}>
          <h1>{article.title}</h1>
          <div className={styles.user_container}>
            <Image
              className={styles.img_user}
              src={article.user_img ? article.user_img : "/no-user-image.jpg"}
              alt={article.title}
              width={50}
              height={50}
            />
            <div>
              <p>{article.user_name}</p>
              <p className={styles.date}>{handleDate(article.date)}</p>
            </div>
          </div>
        </div>
        <div className={styles.container_img}>
          <Image
            src={article.imagePresentation}
            alt={article.title}
            fill={true}
          />
        </div>
      </div>

      <div className="container_aside">
        <section className="section_aside_left">
          <article
            className={styles.article}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Comments />
        </section>
        <Aside />
      </div>
    </main>
  );
}
