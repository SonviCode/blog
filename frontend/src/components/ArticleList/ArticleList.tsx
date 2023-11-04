import { API_GET_ARTICLES } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Article } from "@/types/articleTypes";
import { useState } from "react";
import styles from "./articlelist.module.scss";
import Link from "next/link";
import Image from "next/image";
import { handleDate } from "../../utils/userUtils";

function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);

  useFetchData(setArticles, API_GET_ARTICLES);

  console.log(articles);

  return (
    <>
      {articles?.map((article, i) => (
        <div key={i} className={styles.article}>
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
                style={{ color: article.category_color }}
              >
                {article.category_name}
              </Link>
            </p>

            <h3>{article.title}</h3>

            <p className={styles.description}>{article.description}</p>

            <Link className={styles.more_infos} href={`/article/${article.id}`}>
              Lire plus
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default ArticleList;
