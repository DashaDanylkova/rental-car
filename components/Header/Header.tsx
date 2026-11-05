"use client";

import styles from "./Header.module.css";
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCatalog = pathname === "/catalog";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Logo />

        <nav>
          <ul className={styles.linkWrapper}>
            <li>
              <Link
                href="/"
                className={`${styles.link} ${isHome ? styles.active : ""}`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/catalog"
                className={`${styles.link} ${isCatalog ? styles.active : ""}`}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
