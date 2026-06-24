import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignInPage from "@/components/templates/SignInPage";

export const metadata = {
  title: "پروژه املاک | وارد حساب کاربری خود شوید",
};

export default async function SignIn() {
  const data = await getServerSession();

  if (data?.user?.email) {
    return redirect("/dashboard");
  }

  return <SignInPage />;
}
