import styles from "../styles/Search.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { formatStringDataToArray } from "../utils/helpers";
import { Hotel, Hotels } from "../utils/types";
import HotelCard from "../components/custom-comp/HotelCard/HotelCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Search({ results }: { results: string }) {
  // Sort:
  const [sort, setSort] = useState("");
  function handleSort(sort: string) {
    setSort(sort);
  }
  const mapSortTypeToCompareFunction: any = {
    price: (a: Hotel, b: Hotel) => Number(a.price) - Number(b.price),
    name: (a: Hotel, b: Hotel) => a.name.localeCompare(b.name),
  };

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
    setPrice(price);
  }
  // Variables
  const {
    query: { from, to },
  } = useRouter();
  const lowestDateTimeStamp: number = new Date(from as string).getTime();
  const upperDateTimeStamp: number = new Date(to as string).getTime();

  const formattedResults: Hotels = formatStringDataToArray(results);
  const filteredResults = formattedResults
    .filter(
      (hotel) =>
        new Date(hotel.available_on).getTime() > lowestDateTimeStamp &&
        new Date(hotel.available_on).getTime() < upperDateTimeStamp
    )
    .filter((hotel) => hotel.name.toLowerCase().includes(query.toLowerCase()))
    .filter((hotel) => Number(price) < Number(hotel.price))
    .sort(mapSortTypeToCompareFunction[sort]);

  const searchMetaData = {
    results: filteredResults.length,
    prices: formattedResults.map((hotel) => hotel.price),
  };
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
            type="search"
          />
        </div>
        <div>
          {" "}
          <label>
            <h3 className="text-left">Price Filter</h3>
            <input
              name="pricerange"
              className={styles.input}
              onChange={handlePriceChange}
              type="range"
              min={searchMetaData.prices[0]}
              max={searchMetaData.prices[searchMetaData.prices.length - 1]}
              step="5"
            />
            {`${price.length > 0 ? `More than ${price}` : ""}`}
          </label>
        </div>
      </aside>
      <div className={styles.results}>
        <header className={styles.header}>
          <strong>Total Nights {`${searchMetaData.results}`}</strong>
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
          {filteredResults.map(
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
