import styles from "../styles/Search.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { formatStringDataToArray } from "../utils/helpers";
import { Hotel, Hotels } from "../utils/types";
import HotelCard from "../components/custom-comp/HotelCard/HotelCard";
import { useEffect, useState } from "react";

export default function Search({ results }: { results: string }) {
  // Sort:
  function handleSort(sort: string) {
    console.log(sort);
  }
  // Query
  const [query, setQuery] = useState("");
  function handleQueryChange({
    target: { value: query },
  }: React.ChangeEvent<HTMLInputElement>) {
    setQuery(query);
  }
  // Format API response
  const formattedResults: Hotels = formatStringDataToArray(results);
  const [localData, setLocalData] = useState(formattedResults);

  //respond to change in query
  useEffect(() => {
    if (query.length > 0) {
      const queryFilteredResults = localData.filter((hotel) =>
        hotel.name.includes(query)
      );
      setLocalData(queryFilteredResults);
    } else {
      setLocalData(localData);
    }
  }, [query]);

  //respond to change in price filter
  // useEffect(() => {
  //   if (query.length > 0) {
  //   }
  // }, [query]);

  console.log(localData);

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <input name="query" onChange={handleQueryChange} />
      </aside>
      <div className={styles.results}>
        <header className={styles.header}>
          <strong>Total Nights</strong>
          <div className={styles.buttonContainer}>
            <button onClick={() => handleSort("price")}>Sort by price</button>
            <button onClick={() => handleSort("price")}>Sort by name</button>
          </div>
        </header>

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
