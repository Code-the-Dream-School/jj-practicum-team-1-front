
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Button from "../components/shared/Button";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <img
            src="/plant-hero.jpg"
            alt="Plant sprouting"
            className={styles.heroImage}
          />

          {/* Overlay */}
          <div className={styles.overlay} />

          {/* Hero content */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Plant observation</h1>
            <p className={styles.heroSubtitle}>
              An app for recording and identifying plants
            </p>

            <div className={styles.buttonGroup}>
              <Link to="/explore">
                <Button>Explore</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionText}>
            Upload a plant photo, identify it using our database, and save it to your profile.
          </p>
        </section>
      </main>
    </>
  );
}