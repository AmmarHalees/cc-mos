import { Hotel } from "../../../utils/types";
import styles from "./HotelCard.module.scss";

export default function HotelCard({ name, price, city }: Hotel) {
  return (
    <div className={styles.hotelCard}>
      <p>
        <strong>Name </strong>
        <span>{`: ${name}`}</span>
      </p>
      <p>
        <strong>Price</strong>
        <span>{`: ${price}`}</span>
      </p>
      <p>
        <strong>Name</strong>
        <span>{`: ${city}`}</span>
      </p>
    </div>
  );
}
