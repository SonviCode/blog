"use client";

import ArticleGrid from "@/components/ArticleGrid/ArticleGrid";
import CategoryList from "@/components/CategoryList/CategoryList";
import { API_ARTICLE } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState<any[]>([]);

  useFetchData(setArticles, API_ARTICLE);

  return (
    <main>
      <h1>Tout nos articles disponibles</h1>

      <CategoryList />
      <ArticleGrid articles={articles} />
    </main>
  );
}
