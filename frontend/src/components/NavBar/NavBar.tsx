"use client";

import { NAV_LINKS } from "@/constants/constants";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import styles from "./navbar.module.scss";

const NavBar = ({
  toggleNav,
  setToggleNav,
}: {
  toggleNav: boolean;
  setToggleNav: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className={styles.nav}>
      <FontAwesomeIcon
        icon={toggleNav ? faXmark : faBars}
        className={styles.hamburger}
        onClick={() => setToggleNav(!toggleNav)}
      />
      {toggleNav && (
        <div className={styles.responsive_nav}>
          <ul>
            <NavLinks setToggleNav={setToggleNav} />
          </ul>
        </div>
      )}
      <ul className={styles.list_links}>
        <NavLinks setToggleNav={setToggleNav} />
      </ul>
    </nav>
  );
};

const NavLinks = ({
  setToggleNav,
}: {
  setToggleNav: Dispatch<SetStateAction<boolean>>;
}) => {
  return NAV_LINKS.map((link) => {
    return (
      <li key={link.name}>
        <Link href={link.href} onClick={() => setToggleNav(false)}>
          {link.name}
        </Link>
      </li>
    );
  });
};

export default NavBar;
