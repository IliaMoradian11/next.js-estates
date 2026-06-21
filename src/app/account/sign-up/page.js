"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import AuthForms from "@/components/templates/AuthForms";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", repeat: "" });
  const [isFetching, setIsFetching] = useState(false);

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

    setIsFetching(true);
    const loadingToastId = toast.loading("در حال ارسال اطلاعات...");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password }),
        headers: { "Content-Type": "application/json" },
      });
      setIsFetching(false);
      const json = await res.json();
      if (json.ok) {
        toast.success(json.message, { id: loadingToastId });
        const response = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        if (response.ok) {
          router.replace("/dashboard");
        } else {
          router.push("/account/sign-in");
        }
      } else {
        toast.error(json.error, { id: loadingToastId });
      }
    } catch (err) {
      toast.error("مشکلی در ارتباط با سرور پیش آمد", { id: loadingToastId });
      setIsFetching(false);
    }
  };

  return (
    <AuthForms
      h2Text="فرم ثبت نام"
      linkText="ورود"
      linkHref="sign-in"
      needRepeat={true}
      pText="حساب کاربری دارید؟"
      submitButtonText="ثبت نام"
      submitHandler={submitHandler}
      form={form}
      setForm={setForm}
      isFetching={isFetching}
    />
  );
}
