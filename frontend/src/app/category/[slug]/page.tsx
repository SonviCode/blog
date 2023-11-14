"use client";

import ArticleList from "@/components/ArticleList/ArticleList";
import Aside from "@/components/Aside/Aside";
import { API_ARTICLE, API_GET_CATEGORYS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Category } from "@/types/categoryTypes";
import Error from "next/error";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./category.module.scss";
import Loading from "@/app/loading";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Category() {
  const [category, setCategorys] = useState<Category>();
  const [articles, setArticles] = useState<any[]>([]);
  const pathname = usePathname();

  const categoryName = pathname.split("/")[2];

  let isLoading;

  isLoading = useFetchData(
    setArticles,
    `${API_ARTICLE}/category/${categoryName}`
  );
  isLoading = useFetchData(
    setCategorys,
    `${API_GET_CATEGORYS}/${categoryName}`
  );

  if (isLoading) return <Loading />;
  if (!category) return <Error statusCode={404} />;

  return (
    <main>
      <div className="slug">
        <p>
          <Link href="/">Accueil</Link>{" "}
          <FontAwesomeIcon icon={faChevronRight} />{" "}
          <Link href="/article">Articles</Link>{" "}
          <FontAwesomeIcon icon={faChevronRight} /> {categoryName}
        </p>
      </div>
      <div className={styles.container_head}>
        <div className={styles.container_img}>
          <Image
            src={category.imgUrl}
            alt={category.name}
            fill={true}
            sizes="100 vw"
          />
        </div>
        <h1 className={styles.title} style={{ background: category.color }}>
          {category.name}
        </h1>
      </div>
      <h2 className={styles.second_title}>
        Tout nos articles de la catégorie <span>{category.name}</span>
      </h2>

      <ArticleCard articles={articles} />
    </main>
  );
}
