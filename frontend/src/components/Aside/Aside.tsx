import useFetchData from "@/hooks/useFetchData";
import styles from "./aside.module.scss";
import { useEffect, useState } from "react";
import { API_ARTICLE } from "@/constants/constants";
import Link from "next/link";
import { handleDate } from "@/utils/userUtils";

export default function Aside() {
  const [articles, setArticles] = useState<any[]>([]);

  const isLoading = useFetchData(setArticles, API_ARTICLE);

  const MAX_ARTICLES_IN_ASIDE = 4;

  useEffect(() => {
    if (articles.length > MAX_ARTICLES_IN_ASIDE)
      setArticles([...articles].splice(0, MAX_ARTICLES_IN_ASIDE));
  }, [articles]);

  if (isLoading) return <AsideSkeleton />;

  return (
    <aside className={styles.aside}>
      <h2>Les plus populaires</h2>
      <div className={styles.article_container}>
        {articles?.map((article, i) => (
          <div key={i} className={styles.article}>
            <Link
              href={`/category/${article.category_name}`}
              className={styles.category}
              style={{ background: article.category_color }}
            >
              {article.category_name}
            </Link>

            <Link className={styles.more_infos} href={`/article/${article.id}`}>
              <h3>{article.title}</h3>
              <p>
                <span className={styles.user}>{article.user_name}</span>
                &nbsp;-&nbsp;
                <span className={styles.date}>{handleDate(article.date)}</span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
}

const AsideSkeleton = () => {
  return (
    <aside className={styles.skeleton}>
      <h2></h2>
      <div className={styles.article_container}>
        <div className={styles.content}></div>
        <div className={styles.content}></div>
        <div className={styles.content}></div>
        <div className={styles.content}></div>
      </div>
    </aside>
  );
};
