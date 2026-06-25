import { checkIsSignedIn } from "@/utils/api";
import { redirect } from "next/navigation";

import SignUpPage from "@/components/templates/SignUpPage";

export const metadata = {
  title: "املاک | برای استفاده از امکانات سایت ثبت نام کنید",
};

export default async function SignUp() {
  const usersEmail = await checkIsSignedIn();

  if (usersEmail) redirect("/");

  return <SignUpPage />;
}
