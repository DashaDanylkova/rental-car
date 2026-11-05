// import Image from "next/image";
import styles from "./page.module.css";
import Main from "@/components/Main/Main";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Main />
      </main>
    </div>
  );
}
