import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

import Card from "../modules/Card";

import styles from "./UsersProfilesPage.module.css";

function UsersProfilesPage({ profiles }) {
  return (
    <div className={styles.container}>
      {profiles.map((profile) => (
        <div className={styles.card} key={profile._id}>
          <Card profile={profile} />
          <Link
            href={`/dashboard/profiles/${profile._id}`}
            className={styles.button}
            style={{
              borderColor: "var(--color-green)",
              color: "var(--color-green)",
            }}
          >
            ویرایش
            <FaEdit />
          </Link>
          <button className={styles.button}>
            حذف آگهی
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
}

export default UsersProfilesPage;
