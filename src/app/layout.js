import { Toaster } from "react-hot-toast";
import "./globals.css";

import NextAuthProvider from "@/components/providers/NextAuthProvider";
import Layout from "@/components/layout/Layout";
import { yekan } from "@/utils/fonts";

export const metadata = {
  title: "املاک | خرید، فروش، رهن و اجاره ملک",
  description:
    "پروژه املاک با Next.js | خرید، فروش، رهن و اجاره انواع مغازه، دفتر، خانه و ویلا. آگهی های خود را ثبت کنید تا هزاران نفر آنها را ببینند",
  icons: { icon: "./favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekan.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
