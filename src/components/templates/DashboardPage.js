"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import styles from "./DashboardPage.module.css";

function DashboardPage({ user: { createdAt, email } }) {
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut({ redirect: false });
    toast.success("با موفقیت از حساب خارج شدید");
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <FaRegUserCircle color="#304ffe" size={60} />
        <p>{email}</p>
        <ul>
          <li>
            <Link href="/">حساب کاربری</Link>
          </li>
          <li>
            <Link href="/">آگهی های من</Link>
          </li>
          <li>
            <Link href="/">ثبت آگهی</Link>
          </li>
          <li>
            <button onClick={signOutHandler}>
              <FaSignOutAlt />
              <span>خروج</span>
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <h6>سلام👋</h6>
        <p>آگهی های خود را ثبت کنید تا هزاران نفر آن را مشاهده کنند</p>
        <div className={styles.createdAt}>
          <p>تاریخ عضویت:</p>
          <span>{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
