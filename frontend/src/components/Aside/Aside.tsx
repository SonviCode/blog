import useFetchData from "@/hooks/useFetchData";
import styles from "./aside.module.scss";
import { useState } from "react";
import { API_ARTICLE } from "@/constants/constants";
import Link from "next/link";
import { handleDate } from "@/utils/userUtils";

export default function Aside() {
  const [articles, setArticles] = useState<any[]>();

  useFetchData(setArticles, API_ARTICLE);

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
