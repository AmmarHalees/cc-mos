import styles from "../styles/Search.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { formatStringDataToArray } from "../utils/helpers";
import { Hotel, Hotels } from "../utils/types";
import HotelCard from "../components/custom-comp/HotelCard/HotelCard";
import { useEffect, useState } from "react";

export default function Search({ results }: { results: string }) {
  // Sort:
  const [sort, setSort] = useState("");
  function handleSort(sort: string) {
    setSort(sort);
  }

  // Query
  const [query, setQuery] = useState("");
  function handleQueryChange({
    target: { value: query },
  }: React.ChangeEvent<HTMLInputElement>) {
    setQuery(query);
  }
  //Price
  const [price, setPrice] = useState("");
  function handlePriceChange({
    target: { value: price },
  }: React.ChangeEvent<HTMLInputElement>) {
    console.log(price);
  }
  // Format API response
  const formattedResults: Hotels = formatStringDataToArray(results);

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <div>
          {" "}
          <input
            name="query"
            className={styles.input}
            onChange={handleQueryChange}
            placeholder="Hotel Name"
            type="text"
          />
        </div>
        <div>
          {" "}
          <label>
            <h3>Price Filter</h3>
            <input
              name="pricerange"
              className={styles.input}
              onChange={handlePriceChange}
              type="range"
            />
          </label>
        </div>
      </aside>
      <div className={styles.results}>
        <header className={styles.header}>
          <strong>Total Nights</strong>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              role=""
              aria-selected={sort === "price"}
              onClick={() => handleSort("price")}
            >
              Sort by price
            </button>
            <button
              className={styles.button}
              role=""
              aria-selected={sort === "name"}
              onClick={() => handleSort("name")}
            >
              Sort by name
            </button>
          </div>
        </header>

        <main className={styles.main}>
          {formattedResults
            .filter((hotel) =>
              hotel.name.toLowerCase().includes(query.toLowerCase())
            )
            .sort()
            .map(({ name, price, city, available_on }: Hotel, index) => (
              <HotelCard
                available_on={available_on}
                key={index}
                name={name}
                price={price}
                city={city}
              />
            ))}
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
