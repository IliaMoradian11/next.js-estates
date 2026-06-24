"use client";

import Link from "next/link";

import LoadingButton from "../modules/LoadingButton";

import styles from "./AuthForms.module.css";

function AuthForms({
  h2Text,
  needRepeat,
  submitButtonText,
  linkText,
  linkHref,
  pText,
  form,
  submitHandler,
  setForm,
  isFetching,
}) {
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        {isFetching ? (
          <LoadingButton />
        ) : (
          <button type="submit">{submitButtonText}</button>
        )}
      </form>
      <p>
        {pText} <Link href={`/account/${linkHref}`}>{linkText}</Link>
      </p>
    </div>
  );
}

export default AuthForms;
