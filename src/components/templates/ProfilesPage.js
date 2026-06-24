import Link from "next/link";
import { FiFilter } from "react-icons/fi";

import { categories } from "@/constants/profiles";
import Card from "../modules/Card";

import styles from "./ProfilesPage.module.css";

function ProfilesPage({ profiles }) {
  return (
    <div className={styles.container}>
      <aside>
        <div>
          <FiFilter color="var(--color-blue)" />
          دسته بندی
        </div>
        <ul>
          <li>
            <Link href={{ pathname: "/profiles" }}>همه</Link>
          </li>
          {Object.keys(categories).map((category) => (
            <li key={category}>
              <Link href={{ pathname: "/profiles", query: { category } }}>
                {categories[category]}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        {profiles.length ? (
          profiles.map((profile) => (
            <div className={styles.card}>
              <Card profile={profile} />
            </div>
          ))
        ) : (
          <p className={styles.noProduct}>هیچ آگهی یافت نشد</p>
        )}
      </main>
    </div>
  );
}

export default ProfilesPage;
