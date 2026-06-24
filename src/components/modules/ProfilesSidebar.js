import Link from "next/link";
import { FiFilter } from "react-icons/fi";

import { categories } from "@/constants/profiles";

import styles from "./ProfilesSidebar.module.css"

function ProfilesSidebar() {
  return (
    <aside className={styles.aside}>
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
  );
}

export default ProfilesSidebar;
