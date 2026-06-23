import Link from "next/link";
import { HiArrowLeft, HiOutlineLocationMarker } from "react-icons/hi";
import { FaEdit, FaTrash } from "react-icons/fa";

import { sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";

import styles from "./UsersProfilesPage.module.css";

function UsersProfilesPage({ profiles }) {
  return (
    <div className={styles.container}>
      {profiles.map((profile) => (
        <div className={styles.card}>
          <div className={styles.icon}>{icons[profile.category]}</div>
          <h5>{profile.title}</h5>
          <p className={styles.location}>
            <HiOutlineLocationMarker />
            {profile.location}
          </p>
          <p className={styles.price}>{sp(profile.price)} تومان</p>
          <Link
            href={`/buy-residential/${profile._id}`}
            className={styles.seeProfile}
          >
            مشاهده آگهی
            <HiArrowLeft />
          </Link>
          <Link
            href={`/dashboard/${profile._id}`}
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
