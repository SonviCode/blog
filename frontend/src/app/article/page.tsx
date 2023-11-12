"use client";

import ArticleList from "@/components/ArticleList/ArticleList";
import Filter from "./Filter";

export default function Articles() {
  return (
    <main>
      <h1>Tout nos articles disponibles</h1>

      <Filter />
      <ArticleList />
    </main>
  );
}
