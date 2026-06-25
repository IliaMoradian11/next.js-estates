import { checkIsSignedIn } from "@/utils/api";

import Link from "next/link";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";

import styles from "./Layout.module.css";

async function Layout({ children }) {
  const isSignedIn = await checkIsSignedIn();

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link href="/">صفحه اصلی</Link>
          <Link href="/profiles">آگهی ها</Link>
        </div>
        {!!isSignedIn && (
          <Link href="/dashboard">
            <FaUserAlt size="20px" />
          </Link>
        )}
        {!isSignedIn && (
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
