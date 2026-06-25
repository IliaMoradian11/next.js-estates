"use client";

import Link from "next/link";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import styles from "./DashboardLayout.module.css";

function DashboardLayoutComponent({ children, email, role }) {
  const signOutHandler = async () => {
    await signOut({ redirect: false });
    toast.success("با موفقیت از حساب خارج شدید");
    window.location.replace("/");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {role === "USER" && <FaRegUserCircle color="#304ffe" size={60} />}
        {role === "ADMIN" && (
          <>
            <RiAdminFill
              color="#304ffe"
              size={80}
              style={{
                border: "5px solid #304ffe",
                borderRadius: "50%",
                padding: "10px",
              }}
            />
            <span>Admin</span>
          </>
        )}
        <p>{email}</p>
        <ul>
          <li>
            <Link href="/">حساب کاربری</Link>
          </li>
          <li>
            <Link href="/dashboard/profiles">آگهی های من</Link>
          </li>
          <li>
            <Link href="/dashboard/profiles/add">ثبت آگهی</Link>
          </li>
          {(role === "ADMIN" || role === "SUPER_USER") && (
            <>
              <li>
                <Link href="/admin/profiles/pending">
                  <MdSecurity />
                  در انتظار تایید
                </Link>
              </li>
              <li>
                <Link href="/admin/profiles/published">
                  <MdSecurity />
                  تایید شده ها
                </Link>
              </li>
              <li>
                <Link href="/admin/profiles">
                  <MdSecurity />
                  تمام آگهی ها
                </Link>
              </li>
              <li>
                <Link href="/admin/users">
                  <MdSecurity />
                  کاربران
                </Link>
              </li>
            </>
          )}
          <li>
            <button onClick={signOutHandler}>
              <FaSignOutAlt />
              <span>خروج</span>
            </button>
          </li>
        </ul>
      </aside>
      <main>{children}</main>
    </div>
  );
}

export default DashboardLayoutComponent;
