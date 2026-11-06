import styles from "./Hero.module.css";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <Image
          className={styles.picture}
          src="/images/hero.jpg"
          alt="The white car is driving on the road."
          fill
          priority
          sizes="100vw"
        />

        <div className={styles.heroText}>
          <div>
            <h1 className={styles.mainTitle}>Find your perfect rental car</h1>

            <p className={styles.subText}>
              Reliable and budget-friendly rentals for any journey
            </p>
          </div>
          <Link className={styles.viewBtn} href="/catalog">
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
