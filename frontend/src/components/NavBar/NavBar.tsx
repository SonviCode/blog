"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.scss";
import { NAV_LINKS } from "@/constants/constants";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@/types/userTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const [toggleNav, setToggleNav] = useState<boolean>(false);

  // if(pathname.includes())

  // const arr = ["/", pathname.split("/").pop()[0]].join("")

  // console.log(pathname.split("/").splice(-1).splice(0, 0, "/"));
  // console.log(pathname.split("/").pop());
  // console.log(pathname.split("/"));
  // console.log(arr);

  const user: User | null = useSelector((state: RootState) => state.user.value);

  return (
    <nav className={styles.nav}>
      <FontAwesomeIcon
        icon={toggleNav ? faXmark : faBars}
        className={styles.hamburger}
        onClick={() => setToggleNav(!toggleNav)}
      />
      {toggleNav && (
        <div className={styles.modal_nav}>
          <ul>
            {NAV_LINKS.map((link) => {
              return (
                <li
                  key={link.name}
                  className={
                    pathname.includes(link.href) ? styles.active_link : ""
                  }
                >
                  <Link href={link.href}>
                    {link.name === "Connexion" && user ? "Compte" : link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <ul className={styles.list_links}>
        {NAV_LINKS.map((link) => {
          return (
            <li
              key={link.name}
              className={pathname.includes(link.href) ? styles.active_link : ""}
            >
              <Link href={link.href}>
                {link.name === "Connexion" && user ? "Compte" : link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
