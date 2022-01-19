import styles from "../styles/Search.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { formatStringDataToArray } from "../utils/helpers";
import { Hotel, Hotels } from "../utils/types";
import HotelCard from "../components/custom-comp/HotelCard/HotelCard";

export default function search({ results }: { results: string }) {
  // function filterHotelsArrayBasedOnActiveFilters(formattedResults) {

  // }
  const formattedResults: Hotels = formatStringDataToArray(results);
  // const filteredArray =
  //   filterHotelsArrayBasedOnActiveFilters(formattedResults);

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>aside</aside>
      <div className={styles.results}>
        <header>filters</header>

        <main className={styles.main}>
          {formattedResults.map(
            ({ name, price, city, available_on }: Hotel, index) => (
              <HotelCard
                available_on={available_on}
                key={index}
                name={name}
                price={price}
                city={city}
              />
            )
          )}
        </main>
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
