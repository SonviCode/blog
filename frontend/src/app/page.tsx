import styles from "./home.module.scss";
import Aside from "@/components/Aside/Aside";
import { LIST_CATEGORY } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";

const listArticles = [
  {
    date: "2023-08-12",
    title: "Test",
    img: "/IMG_1371.JPG",
    user: "tom sonvico",
    content: "blablablalbalbalblal",
    category: "montagne",
  },
  {
    date: "2020-05-10",
    title: "La traversée des Vosges",
    img: "/IMG_1371.JPG",
    user: "tom sonvico",
    content: "blablablalbalbalblal",
    category: "montagne",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>
        <span>Hey, C&apos;est Tom !</span> Retrouve ici mes histoires, mes
        idées, mes projets...
      </h2>
      <h2>Catégorie</h2>
      <ul className={styles.category}>
        {LIST_CATEGORY.map((category, i) => (
          <li key={i} style={{ background: category.color }}>
            <Image
              src={category.img}
              alt={category.name}
              width={20}
              height={20}
            />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
      <h2>Articles récents</h2>
      <div className={styles.container}>
        <section className={styles.section_article}>
          {listArticles.map((article, i) => (
            <div key={i} className={styles.article}>
              <div className={styles.container_img}>
                <Image src={article.img} alt={article.title} fill={true} />
              </div>
              <div className={styles.article_info}>
                <p>
                  {article.date} - {article.category}
                </p>
                <h1>{article.title}</h1>
                <p>{article.content}</p>
                <Link href="/">Lire plus</Link>
              </div>
            </div>
          ))}
        </section>
        <Aside />
      </div>
    </main>
  );
}
