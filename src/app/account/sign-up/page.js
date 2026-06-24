import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignUpPage from "@/components/templates/SignUpPage";

export const metadata = {
  title: "املاک | برای استفاده از امکانات سایت ثبت نام کنید",
};

export default async function SignUp() {
  const data = await getServerSession();

  if (data?.user?.email) {
    return redirect("/dashboard");
  }

  return <SignUpPage />;
}
