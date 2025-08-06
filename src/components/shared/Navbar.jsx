import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">PlantApp</Link>
      </div>
      <div className={styles.authLinks}>
        <Link to="/login" className={styles.link}>Log In</Link>
        <Link to="/signup" className={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
}