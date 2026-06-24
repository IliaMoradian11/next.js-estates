import { getServerSession } from "next-auth";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import Link from "next/link";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";

import styles from "./Layout.module.css";

async function Layout({ children }) {
  const data = await getServerSession();
  let isSignedIn = null;

  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return notFound();
    }

    const user = await User.findOne({ email: data.user.email });
    if (user) {
      isSignedIn = true;
    } else {
      isSignedIn = false;
    }
  } catch (err) {
    isSignedIn = false;
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link href="/">صفحه اصلی</Link>
          <Link href="/buy-residential">آگهی ها</Link>
        </div>
        {isSignedIn === true && (
          <Link href="/dashboard">
            <FaUserAlt size="20px" />
          </Link>
        )}
        {isSignedIn === false && (
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
