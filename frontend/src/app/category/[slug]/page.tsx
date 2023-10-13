"use client";

import ArticleList from "@/components/ArticleList/ArticleList";
import Aside from "@/components/Aside/Aside";
import { API_GET_CATEGORYS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Category } from "@/types/categoryTypes";
import Error from "next/error";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./category.module.scss";

export default function Category() {
  const [category, setCategorys] = useState<Category>();
  const pathname = usePathname();

  useFetchData(setCategorys, `${API_GET_CATEGORYS}/${pathname.split("/")[2]}`);

  if (!category) return <Error statusCode={404} />;

  return (
    <main>
      <div className={styles.container_head}>
        <div className={styles.container_img}>
          <Image src={category.imgUrl} alt={category.name} fill={true} />
        </div>
        <h1 className={styles.title} style={{ background: category.color }}>
          {category.name}
        </h1>
      </div>
      <p>Bienvenu dans la catégorie : {category.name}</p>
      <h2>
        Tout nos articles de la catégorie <span>{category.name}</span>
      </h2>
      <div className="container_aside">
        <section className="section_aside_left">
          <ArticleList />
        
        </section>
        <Aside />
      </div>
    </main>
  );
}
