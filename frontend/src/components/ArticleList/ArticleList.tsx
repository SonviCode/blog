import { API_ARTICLE } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleDate } from "../../utils/userUtils";
import styles from "./articlelist.module.scss";

function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);

  useFetchData(setArticles, API_ARTICLE);

  console.log(articles);

  return (
    <>
      {articles?.map((article, i) => (
        <Link
          key={i}
          className={styles.article}
          href={`/article/${article.id}`}
        >
          <div className={styles.container_img}>
            <Image
              src={article.imagePresentation}
              alt={article.title}
              fill={true}
            />
          </div>
          <div className={styles.article_info}>
            <p>
              <span className={styles.date}>{handleDate(article.date)}</span>
              &nbsp;-&nbsp;
              <Link
                href={`/category/${article.category_name}`}
                className={styles.category}
                style={{ background: article.category_color }}
              >
                {article.category_name}
              </Link>
            </p>

            <h3>{article.title}</h3>

            <p className={styles.description}>{article.description}</p>

            <p className={styles.more_infos}>Lire plus</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ArticleList;
