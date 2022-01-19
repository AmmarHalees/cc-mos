import styles from "../styles/Search.module.scss";

export default function search() {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>aside</aside>
      <div className={styles.results}>
        <header>filters</header>

        <main className={styles.main}>main</main>
      </div>
    </div>
  );
}
