"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.scss";
import { NAV_LINKS } from "@/constants/constants";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const pathname = usePathname();

  
  return (
    <nav className={styles.nav}>
      <FontAwesomeIcon icon={faBars} className={styles.hamburger} />
      <ul className={styles.list_links}>
        {NAV_LINKS.map((link) => {
          return (
            <li
              key={link.name}
              className={pathname === link.href ? styles.active_link : ""}
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
