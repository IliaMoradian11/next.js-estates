"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import styles from "./AuthForms.module.css";

function AuthForms({ h2Text, needRepeat, submitButtonText, linkText, pText }) {
  const [form, setForm] = useState({ email: "", password: "", repeat: "" });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.email.length < 4 || form.password.length < 8) {
      toast.error("ایمیل باید بیش از چهار و رمز عبور باید بیش از هشت حرف باشد");
      return;
    }

    if (form.repeat !== form.password) {
      toast.error(
        "عبارات وارد شده در قسمت های 'رمز عبور' و 'تکرار رمز عبور' یکسان نیستند",
      );
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      console.log(json);
      if (json.ok) {
        toast.success(json.message);
      } else {
        toast.error(json.error);
      }
    } catch (err) {
      toast.error("مشکلی در ارتباط با سرور پیش آمد");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{h2Text}</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">ایمیل:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={changeHandler}
        />
        <label htmlFor="password">رمز عبور:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={changeHandler}
        />
        {needRepeat && (
          <>
            <label htmlFor="repeat">تکرار رمز عبور:</label>
            <input
              type="password"
              id="repeat"
              name="repeat"
              value={form.repeat}
              onChange={changeHandler}
            />
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
