"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./AuthForms.module.css";

function AuthForms({ h2Text,needRepeat, submitButtonText, linkText, pText }) {
  const [form, setForm] = useState({email: "", password: ""})
  return (
    <div className={styles.container}>
      <h2>{h2Text}</h2>
      <form>
        <label htmlFor="email">ایمیل:</label>
        <input type="email" id="email" />
        <label htmlFor="password">رمز عبور:</label>
        <input type="password" id="password" />
        {needRepeat && (
          <>
            <label htmlFor="repeat">تکرار رمز عبور:</label>
            <input type="password" id="repeat" />
          </>
        )}
        <button type="submit">{submitButtonText}</button>
      </form>
      <p>
        {pText} <Link href="/account/sign-in">{linkText}</Link>
      </p>
    </div>
  );
}

export default AuthForms;
