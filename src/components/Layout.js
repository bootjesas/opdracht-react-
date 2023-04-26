import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';


export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/index">
            <Image className={styles.logo} src="/bike.png" alt="logo" width={150} height={50} />
  
        </Link>
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
