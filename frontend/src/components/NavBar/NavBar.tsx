"use client";

import { NAV_LINKS } from "@/constants/constants";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./navbar.module.scss";

const NavBar = () => {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const pathname = usePathname();
  // const wrapperRef = useRef(null);

  // const isOutside = useOutsideAlerter(wrapperRef);

  const { ref, isComponentVisible } = useOutsideAlerter(true);

  // console.log(isComponentVisible);

  // useEffect(() => {
  //   console.log(isOutside);

  //   if (isOutside) setToggleNav(false);
  // }, [isOutside]);

  // if(pathname.includes())

  // const arr = ["/", pathname.split("/").pop()[0]].join("")

  // console.log(pathname.split("/").splice(-1).splice(0, 0, "/"));
  // console.log(pathname.split("/").pop());
  // console.log(pathname.split("/"));
  // console.log(pathname);

  return (
    <nav className={styles.nav}>
      <FontAwesomeIcon
        icon={toggleNav ? faXmark : faBars}
        className={styles.hamburger}
        onClick={() => setToggleNav(!toggleNav)}
      />
      {toggleNav && (
        <div
          className={styles.modal_nav}
          ref={ref}
          // onBlur={() => console.log("test")}
        >
          <ul>
            <NavLinks />
          </ul>
        </div>
      )}
      <ul className={styles.list_links}>
        <NavLinks />
      </ul>
    </nav>
  );
};

const NavLinks = () => {
  return NAV_LINKS.map((link) => {
    return (
      <li key={link.name}>
        <Link href={link.href}>{link.name}</Link>
      </li>
    );
  });
};

export default NavBar;
