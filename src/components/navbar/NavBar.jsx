import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <Link href="/">Logo</Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default NavBar;
