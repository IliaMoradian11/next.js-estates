import Image from "next/image";
import Link from "next/link";
import { FaCity } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";

import { categories } from "@/constants/profiles";
import { cities, services } from "@/constants/homePage";
import Card from "../modules/Card";

import styles from "./HomePage.module.css";

function HomePage({ profiles }) {
  return (
    <div className={styles.container}>
      <h2>سامانه خرید و اجاره ملک</h2>
      <ul className={styles.services}>
        {services.map((service) => (
          <li key={service}>
            <FiCircle />
            <span>{service}</span>
          </li>
        ))}
      </ul>
      <div className={styles.categoryCardContainer}>
        {Object.keys(categories).map((category) => (
          <Link
            href={{ pathname: "/profiles", query: { category } }}
            key={category}
          >
            <div className={styles.categoryCard}>
              <Image
                src={`/images/${category}.png`}
                alt={category}
                width={240}
                height={144}
              />
              <p>{categories[category]}</p>
            </div>
          </Link>
        ))}
      </div>
      <p className={styles.headerText}>شهر های پر بازدید</p>
      <ul className={styles.cityContainer}>
        {cities.map((city) => (
          <li key={city} className={styles.city}>
            <FaCity />
            <span>{city}</span>
          </li>
        ))}
      </ul>
      <p className={styles.headerText}>آگهی های جدید</p>
      <div className={styles.profilesContainer}>
        {profiles.length ? (
          profiles.map((profile) => (
            <div className={styles.card}>
              <Card profile={profile} />
            </div>
          ))
        ) : (
          <p className={styles.noProduct}>هیچ آگهی یافت نشد</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
