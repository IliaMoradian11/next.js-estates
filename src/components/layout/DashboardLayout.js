"use client"

import Link from "next/link";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import styles from "./DashboardLayout.module.css";

function DashboardLayoutComponent({ children, email }) {
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
            <Link href="/dashboard/add-profile">ثبت آگهی</Link>
          </li>
          <li>
            <button onClick={signOutHandler}>
              <FaSignOutAlt />
              <span>خروج</span>
            </button>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}

export default DashboardLayoutComponent;
