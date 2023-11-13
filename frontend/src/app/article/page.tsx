"use client";

import ArticleList from "@/components/ArticleList/ArticleList";
import Filter from "./Filter";
import CategoryList from "@/components/CategoryList/CategoryList";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { useState } from "react";
import { API_ARTICLE } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";

export default function Articles() {
  const [articles, setArticles] = useState<any[]>([]);

  useFetchData(setArticles, API_ARTICLE);

  return (
    <main>
      <h1>Tout nos articles disponibles</h1>

      <CategoryList />
      <ArticleCard articles={articles} />
    </main>
  );
}
