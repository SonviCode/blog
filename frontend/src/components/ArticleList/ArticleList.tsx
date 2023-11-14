import { API_ARTICLE } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleDate } from "../../utils/userUtils";
import Pagination from "../Pagination/Pagination";
import styles from "./articlelist.module.scss";

function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);
  const [indexPaginationArticles, setIndexPaginationArticles] =
    useState<number>(0);

  useFetchData(setArticles, API_ARTICLE);

  const MAX_ARTICLES_IN_LIST = 4;
  const articlesGroup: any[] = [];

  for (let i = 0; i < articles.length; i += MAX_ARTICLES_IN_LIST) {
    const number = articles.slice(i, i + MAX_ARTICLES_IN_LIST);
    articlesGroup.push(number);
  }

  return (
    <>
      {articlesGroup[indexPaginationArticles]?.map(
        (article: any, i: React.Key) => (
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
                sizes="100 vw"
              />
            </div>
            <div className={styles.article_info}>
              <p>
                <span className={styles.date}>{handleDate(article.date)}</span>
                &nbsp;-&nbsp;
                <span
                  className={styles.category}
                  style={{ background: article.category_color }}
                >
                  {article.category_name}
                </span>
              </p>

              <h3>{article.title}</h3>

              <p className={styles.description}>{article.description}</p>

              <p className={styles.more_infos}>Lire plus</p>
            </div>
          </Link>
        )
      )}
      <Pagination
        articlesGroup={articlesGroup}
        setIndexPaginationArticles={setIndexPaginationArticles}
        indexPaginationArticles={indexPaginationArticles}
      />
    </>
  );
}

export default ArticleList;
