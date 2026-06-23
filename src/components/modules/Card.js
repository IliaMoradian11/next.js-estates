import Link from "next/link";
import { HiArrowLeft, HiOutlineLocationMarker } from "react-icons/hi";

import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";

import styles from "./Card.module.css";

function Card({ profile: { category, title, location, price, _id } }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icons[category]}</div>
      <h5>{title}</h5>
      <p className={styles.location}>
        <HiOutlineLocationMarker />
        {location}
      </p>
      <p className={styles.price}>{sp(price)} تومان</p>
      <Link href={`/buy-residential/${_id}`} className={styles.seeProfile}>
        مشاهده آگهی
        <HiArrowLeft />
      </Link>
    </div>
  );
}

export default Card;
