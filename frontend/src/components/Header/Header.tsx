"use client";

import Image from "next/image";
import styles from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import NavBar from "../NavBar/NavBar";
import { BLOG_NAME } from "@/constants/constants";
import Link from "next/link";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowResize";

export default function Header() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);

  const [width] = useWindowSize();

  if (width > 880 && toggleNav) setToggleNav(false);

  return (
    <header
      className={
        toggleNav ? `${styles.header_fixed} ${styles.header}` : styles.header
      }
    >
      <ul className={styles.social_media}>
        <li>
          <Link href="https://github.com/SonviCode" target="blank">
            <FontAwesomeIcon icon={faGithub} className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/in/tom-sonvico" target="blank">
            <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
          </Link>
        </li>
      </ul>

      <div className={styles.title}>
        <h1>{BLOG_NAME}</h1>
      </div>
      <div className={styles.menu}>
        <NavBar toggleNav={toggleNav} setToggleNav={setToggleNav} />
      </div>
    </header>
  );
}
