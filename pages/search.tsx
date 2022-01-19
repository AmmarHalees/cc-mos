import styles from "../styles/Search.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";

export default function search({ results }: { results: string }) {
  console.log(results.split(" ").join().split("\n"));

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`${process.env.API_URL}`);
  let results = res.data;

  return {
    props: { results }, // will be passed to the page component as props
  };
};
