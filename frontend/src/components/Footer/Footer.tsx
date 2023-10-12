"use client";

import {
  API_GET_CATEGORYS,
  BLOG_NAME,
  NAV_LINKS,
  PITCH_PRESENTATION
} from "@/constants/constants";
import useFetchData from "@/hooks/useFetchData";
import { Category } from "@/types/categoryTypes";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  const [categorys, setCategorys] = useState<Category[]>();

  useFetchData(setCategorys, API_GET_CATEGORYS);

  return (
    <footer className={styles.footer}>
      <div className={styles.media_container}>
        <h2>{BLOG_NAME}</h2>
        <p>{PITCH_PRESENTATION}</p>
        <div>
          <ul className={styles.social_media}>
            <li>
              <Link href="https://github.com/SonviCode" target="blank">
                <FontAwesomeIcon icon={faGithub} className={styles.icon} />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/tom-sonvico"
                target="blank"
              >
                <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
              </Link>
            </li>
          </ul>
          <Link href="/notice">Mentions légales</Link>
        </div>
      </div>
      <div className={styles.nav_container}>
        <nav className={styles.nav}>
          <p>Navigation</p>
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => {
              return (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav className={styles.nav}>
          <p>Catégorie</p>
          <ul className={styles.links}>
            {categorys?.map((category, i) => (
              <Link href={`/category/${category.name}`} key={i}>
                {category.name}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
