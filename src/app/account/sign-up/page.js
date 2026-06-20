"use client";

import AuthForms from "@/components/templates/AuthForms";

export default function SignUpPage() {
  return (
    <AuthForms
      h2Text="فرم ثبت نام"
      linkText="ورود"
      needRepeat={true}
      pText="حساب کاربری دارید؟"
      submitButtonText="ثبت نام"
    />
  );
}
