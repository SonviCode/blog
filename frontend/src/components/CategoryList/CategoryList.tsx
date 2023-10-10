"use client";

import React, { useEffect, useState } from "react";
import styles from "./categorylist.module.scss";
import Image from "next/image";
import { API_GET_CATEGORYS } from "@/constants/constants";
import { Category } from "@/types/categoryTypes";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";

function CategoryList() {
  const [categorys, setCategorys] = useState<Category[]>();

  useFetchData(setCategorys, API_GET_CATEGORYS);

  return (
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
  );
}

export default CategoryList;
