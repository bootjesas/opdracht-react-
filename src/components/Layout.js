import Link from 'next/link';
import { useState } from 'react';
import styles from '@/styles/Home.module.css'


export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={menuOpen ? `${styles.menu} ${styles.open}` : styles.menu}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
