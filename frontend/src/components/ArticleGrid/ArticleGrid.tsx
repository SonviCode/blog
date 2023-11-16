import Image from "next/image";
import Link from "next/link";
import { handleDate } from "../../utils/userUtils";
import styles from "./articlegrid.module.scss";

function ArticleGrid({ articles }: any) {
  return (
    <section className={styles.container_articles}>
      {articles?.map((article: any, i: React.Key) => (
        <Link
          key={i}
          className={styles.article}
          href={`/article/${article.id}`}
        >
          <div className={styles.container_img}>
            <span
              className={styles.category}
              style={{ background: article.category_color }}
            >
              {article.category_name}
            </span>
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
            </p>

            <h3>{article.title}</h3>

            <p className={styles.more_infos}>Lire plus</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default ArticleGrid;
