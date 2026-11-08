import Image from "next/image";

import styles from "./NoCarsFound.module.css";

interface NoCarsFoundProps {
  onReset: () => void;
}

export default function NoCarsFound({ onReset }: NoCarsFoundProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/not-found.png"
          alt="No cars found"
          width={413}
          height={388}
          className={styles.image}
        />
      </div>

      <div className={styles.textWrapper}>
        <h2 className={styles.title}>No cars found</h2>

        <p className={styles.description}>
          We couldn&apos;t find any cars that match your current filters. Try
          changing your search criteria or reset the filters.
        </p>
      </div>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
