import Image from "next/image";
import Link from "next/link";
import { handleDate } from "../../utils/userUtils";
import styles from "./articlecard.module.scss";

function ArticleCard({ articles }: any) {
  return (
    <div className={styles.container_articles}>
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
    </div>
  );
}

export default ArticleCard;
