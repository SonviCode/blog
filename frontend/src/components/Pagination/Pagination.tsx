import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./pagination.module.scss";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination({
  articlesGroup,
  setIndexPaginationArticles,
  indexPaginationArticles,
}: any) {
  const removeIndexPagination = () => {
    if (indexPaginationArticles === 0) return;

    setIndexPaginationArticles(indexPaginationArticles - 1);
  };

  const addIndexPagination = () => {
    if (indexPaginationArticles === articlesGroup.length - 1) return;

    setIndexPaginationArticles(indexPaginationArticles + 1);
  };

  return (
    <div className={styles.pagination}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={() => removeIndexPagination()}
      />
      {articlesGroup.map((_group: any[], i: React.Key) => (
        <button
          key={i}
          onClick={() => setIndexPaginationArticles(Number(i))}
          className={
            Number(i) === indexPaginationArticles ? styles.isActive : ""
          }
        >
          {Number(i) + 1}
        </button>
      ))}
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={() => addIndexPagination()}
      />
    </div>
  );
}

export default Pagination;
