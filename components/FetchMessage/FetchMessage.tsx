import { SpinnerCircularFixed } from "spinners-react";

import styles from "./FetchMessage.module.css";

export default function FetchMessage() {
  return (
    <div className={styles.messageContainer}>
      <SpinnerCircularFixed
        size={72}
        thickness={150}
        speed={100}
        color="#00AAD4"
        secondaryColor="#F7F7F7"
      />

      <h2 className={styles.title}>Loading cars...</h2>

      <p className={styles.text}>
        Please wait while we fetch the best cars for you
      </p>
    </div>
  );
}
