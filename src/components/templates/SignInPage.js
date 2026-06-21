"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import AuthForms from "@/components/templates/AuthForms";

function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isFetching, setIsFetching] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.email.length < 4 || form.password.length < 8) {
      toast.error("ایمیل باید بیش از چهار و رمز عبور باید بیش از هشت حرف باشد");
      return;
    }

    setIsFetching(true);
    const loadingToastId = toast.loading("در حال ارسال اطلاعات...");

    try {
      const res = await signIn("credentials", { ...form, redirect: false });
      setIsFetching(false);
      if (res.ok) {
        toast.success("با موفقیت وارد حساب کاربری شدید", {
          id: loadingToastId,
        });
        router.replace("/dashboard");
      } else {
        toast.error(res.error, { id: loadingToastId });
      }
    } catch (err) {
      toast.error("ورود به حساب انجام نشد", { id: loadingToastId });
      setIsFetching(false);
    }
  };

  return (
    <AuthForms
      h2Text="فرم ورود"
      linkText="ثبت نام"
      linkHref="sign-up"
      needRepeat={false}
      pText="حساب کاربری ندارید؟"
      submitButtonText="ورود"
      form={form}
      setForm={setForm}
      submitHandler={submitHandler}
      isFetching={isFetching}
    />
  );
}

export default SignInPage;
