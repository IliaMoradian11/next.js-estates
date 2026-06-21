"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

import styles from "./Layout.module.css";

function Layout({ children }) {
  const data = useSession();

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link href="/">صفحه اصلی</Link>
          <Link href="/buy-residential">آگهی ها</Link>
        </div>
        {data.status === "loading" && (
          <button disabled>
            <TailSpin color="#304ffe" height={20} strokeWidth={5} />
          </button>
        )}
        {data.status === "authenticated" && (
          <Link href="/dashboard">
            <FaUserAlt />
          </Link>
        )}
        {data.status === "unauthenticated" && (
          <Link href="/account/sign-in">
            <FaSignInAlt />
            <span>ورود</span>
          </Link>
        )}
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <section>
          <h4>سامانه خرید و اجاره ملک</h4>
        </section>
        <div>
          <section>
            <p>
              لورم ایپسوم متن ساختگی با با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است. چاپگر ها و متون بلکه روزنامه و مجله
              در ستون و سطر آنچنان که لازم است.
            </p>
          </section>
          <section>
            <p>چرا ما؟</p>
            <ul>
              <li>تعرفه قانونی</li>
              <li>دسترسی سریع</li>
              <li>مشاورین خبره</li>
              <li>قولنامه محضری</li>
            </ul>
          </section>
        </div>
      </footer>
    </>
  );
}

export default Layout;
