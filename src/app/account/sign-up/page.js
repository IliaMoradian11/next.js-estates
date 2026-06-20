"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import AuthForms from "@/components/templates/AuthForms";

export default function SignUpPage() {
  const [form, setForm] = useState({ email: "", password: "", repeat: "" });

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
    <AuthForms
      h2Text="فرم ثبت نام"
      linkText="ورود"
      needRepeat={true}
      pText="حساب کاربری دارید؟"
      submitButtonText="ثبت نام"
      submitHandler={submitHandler}
      form={form}
      setForm={setForm}
    />
  );
}
