"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import AuthForms from "@/components/templates/AuthForms";

export default function SignUpPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.email.length < 4 || form.password.length < 8) {
      toast.error("ایمیل باید بیش از چهار و رمز عبور باید بیش از هشت حرف باشد");
      return;
    }

    try {
      const res = await signIn("credentials", { ...form, redirect: false });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthForms
      h2Text="فرم ورود"
      linkText="ثبت نام"
      needRepeat={false}
      pText="حساب کاربری ندارید؟"
      submitButtonText="ورود"
      form={form}
      setForm={setForm}
      submitHandler={submitHandler}
    />
  );
}
