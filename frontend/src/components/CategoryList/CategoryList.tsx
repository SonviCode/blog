import { API_GET_CATEGORYS } from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Category } from "@/types/categoryTypes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./categorylist.module.scss";
import Loading from "@/app/loading";

function CategoryList() {
  const [categorys, setCategorys] = useState<Category[]>();

  const isLoading = useFetchData(setCategorys, API_GET_CATEGORYS);

  if (isLoading) return <CategoryListSkeleton />;
  return (
    categorys?.length! > 0 && (
      <ul className={styles.category}>
        {categorys?.map((category, i) => (
          <li key={i} style={{ background: category.color }}>
            <Link href={`/category/${category.name}`}>
              <Image
                src={category.imgUrl}
                alt={category.name}
                width={20}
                height={20}
              />
              <p>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
}

export default CategoryList;

const CategoryListSkeleton = () => {
  return <ul className={styles.skeleton}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </ul>;
};
